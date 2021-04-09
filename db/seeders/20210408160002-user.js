'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'user@example.com',
        encryptedPassword:
          '$2b$10$iXdUI8RXOx1F6dqrXvk5A.lW28AdbSymnJ02F7GYSpO0uFXmamXeC',
        role: 'SUPER_ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {}),
};
