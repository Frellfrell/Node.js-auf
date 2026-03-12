'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("Products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },

    categoryName: {
      type: Sequelize.STRING,
      references: {
        model: "Categories",
        key: "name"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
