interface DB {
  sequelize: import('sequelize').Sequelize;
  Sequelize: typeof import('sequelize').Sequelize;
  User: import('../../models/User').UserStatic;
  LoggedError: import('../../models/LoggedError').LoggedErrorStatic;
  Session: import('../../models/Session').SessionStatic;
}
