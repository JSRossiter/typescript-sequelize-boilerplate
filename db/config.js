const PROJECT = 'example';

module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: `${PROJECT}_development`,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
    },
  },
  test: {
    username: 'postgres',
    password: null,
    database: `${PROJECT}_test`,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: 'postgres',
    password: process.env.DB_PASS,
    database: `${PROJECT}_production`,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
    },
  },
};
