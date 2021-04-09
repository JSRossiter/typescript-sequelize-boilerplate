'use strict';
import PagerDutyClient, { PDSeverity } from 'node-pagerduty';
import os from 'os';
import { DataTypes as DataTypesType, Model, Op, Sequelize } from 'sequelize';
import logger from '../utilities/logger';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const factory = (sequelize: Sequelize, DataTypes: typeof DataTypesType) => {
  const onceInFiveMinutes = {
    interval: 5 * 60 * 1000,
    allowed: 1,
  };
  const twiceInFiveMinutes = {
    interval: 5 * 60 * 1000,
    allowed: 2,
  };
  class LoggedError
    extends Model<LoggedErrorAttributes, LoggedErrorCreationAttributes>
    implements LoggedErrorAttributes {
    public id: number;
    public key: string;
    public message: string;
    public stack: string;
    public severity: ErrorSeverity;
    public dedupKey: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static ALLOWED_ERRORS = {
      // EXAMPLE_KEY: twiceInFiveMinutes,
    };

    public static handleError = async ({
      error,
      key,
      severity = 'error',
      data,
      dedupKey,
    }: {
      key: string;
      error?: Error;
      severity?: PDSeverity;
      data?: unknown;
      dedupKey?: string;
    }) => {
      try {
        let message = key;
        if (error) {
          message += `: ${String(error)}`;
          logger.error(error);
        }
        if (data) {
          logger.error(`${message} %O`, data);
          message += ` ${JSON.stringify(data)}`;
        } else {
          logger.error(message);
        }

        const loggedError = await LoggedError.create({
          key,
          message: message
            .replace(new RegExp(`^${key}`), '')
            .replace(/^:\s/, '')
            .slice(0, 255),
          stack: error?.stack,
          severity,
          dedupKey,
        });
        await loggedError.handleAfterCreate({ data, error });
      } catch (e) {
        logger.error(`Error in handleError, ${String(e)}`);
      }
    };

    _knownError = (
      key: string,
    ): key is keyof typeof LoggedError.ALLOWED_ERRORS =>
      key in LoggedError.ALLOWED_ERRORS;

    handleAfterCreate = async (customDetails?: unknown) => {
      if (this._knownError(this.key)) {
        const details = LoggedError.ALLOWED_ERRORS[this.key];
        const count = await LoggedError.count({
          where: {
            key: this.key,
            createdAt: { [Op.gte]: +new Date() - details.interval },
          },
        });
        if (count <= details.allowed) {
          logger.debug(`Allowing occurrence ${count} of ${this.key}`);
          return;
        }
      }
      if (process.env.NODE_ENV === 'production') {
        try {
          const response = await this._sendToPagerDuty(customDetails);
          this.dedupKey = response.dedup_key;
          await this.save();
        } catch (error) {
          logger.error(error);
        }
      }
    };

    _sendToPagerDuty = (customDetails?: unknown) => {
      logger.debug('submitting to pd');
      const pd = new PagerDutyClient(process.env.PAGER_DUTY_KEY);
      const source = os.hostname();
      return pd.events.sendEvent({
        routing_key: process.env.PAGER_DUTY_INTEGRATION_KEY,
        event_action: 'trigger',
        dedup_key: this.dedupKey,
        payload: {
          summary: `${this.key} ${this.message}`,
          source,
          severity: this.severity,
          custom_details: customDetails,
        },
      });
    };

    resolve = () => {
      const pd = new PagerDutyClient(process.env.PAGER_DUTY_KEY);
      return pd.events.sendEvent({
        routing_key: process.env.PAGER_DUTY_INTEGRATION_KEY,
        event_action: 'resolve',
        dedup_key: this.dedupKey,
      });
    };
  }

  LoggedError.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: DataTypes.STRING,
      message: DataTypes.STRING,
      stack: DataTypes.TEXT,
      severity: DataTypes.ENUM('critical', 'error', 'warning', 'info'),
      dedupKey: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'LoggedError',
    },
  );
  return LoggedError;
};

export type LoggedErrorStatic = ReturnType<typeof factory>;
export type LoggedErrorModel = InstanceType<LoggedErrorStatic>;
export default factory;
