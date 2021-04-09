'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('LoggedErrors', 'severity', {
      type: Sequelize.ENUM('critical', 'error', 'warning', 'info'),
      allowNull: false,
      defaultValue: 'error',
    });
    await queryInterface.addColumn('LoggedErrors', 'dedupKey', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('LoggedErrors', 'severity');
    await queryInterface.removeColumn('LoggedErrors', 'dedupKey');
  },
};
