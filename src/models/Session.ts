'use strict';
import { DataTypes as DataTypesType, Model, Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const factory = (sequelize: Sequelize, DataTypes: typeof DataTypesType) => {
  class Session
    extends Model<SessionAttributes, SessionCreationAttributes>
    implements SessionAttributes {
    public sid: string;
    public userId: string;
    public expires: Date;
    public data: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  Session.init(
    {
      sid: DataTypes.STRING,
      userId: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Session',
      freezeTableName: true,
    },
  );
  return Session;
};

export type SessionStatic = ReturnType<typeof factory>;
export type SessionModel = InstanceType<SessionStatic>;
export default factory;
