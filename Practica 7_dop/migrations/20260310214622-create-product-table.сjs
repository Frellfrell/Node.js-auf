'use strict';

/* @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(255),  // задаем максимальную длину
        allowNull: false,
        unique: true,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),  // точность для цен
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // устанавливается текущее время по умолчанию
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // будет обновляться с каждым изменением
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
