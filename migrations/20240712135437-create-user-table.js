'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      UserID: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      Role: {
        type: Sequelize.ENUM('Admin', 'Customer'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
