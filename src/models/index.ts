'use strict';

import chalk from 'chalk';
import { DataTypes, Sequelize } from 'sequelize';
import fullConfig from '../../db/config.js';
import logger from '../utilities/logger';
import LoggedErrorFactory from './LoggedError';
import SessionFactory from './Session';
import UserFactory from './User';

const env = process.env.NODE_ENV || 'development';
const config = fullConfig[env];

const dbLogger = (query: string, ms: number, options: { bind: string[] }) => {
  let paramString = '';
  if (options.bind) {
    paramString += ' with ';
    options.bind.forEach((param, i) => {
      paramString += `${chalk.yellow(`$${i + 1}`)} = ${param}`;
      if (i !== options.bind.length - 1) {
        paramString += ', ';
      }
    });
  }
  const insertIndex = query.indexOf(': ') + 1;
  const queryText =
    query.slice(0, insertIndex) +
    chalk.magentaBright(` [${ms}ms]`) +
    query.slice(insertIndex).replace(/\s\s+/g, ' ');
  logger.debug(`${queryText}${paramString}`);
};

let sequelize: Sequelize;
if (config.logging) {
  config.logging = dbLogger;
  config.benchmark = true;
}
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const db: DB = {
  sequelize,
  Sequelize,
  User: UserFactory(sequelize, DataTypes),
  LoggedError: LoggedErrorFactory(sequelize, DataTypes),
  Session: SessionFactory(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName: keyof DB) => {
  // @ts-expect-error don't know
  if (db[modelName].associate) {
    // @ts-expect-error don't know
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export { sequelize };
export default db;
