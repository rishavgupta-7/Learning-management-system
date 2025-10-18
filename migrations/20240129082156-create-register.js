'use strict';

/**
 * Sequelize migration for creating 'Registers' table.
 * This table stores information about user registrations for courses, including user, course, completion status, and timestamps.
 *
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
  /**
   * Applies the migration, creating the 'Registers' table.
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      courseId: {
        type: Sequelize.INTEGER
      },
      coursecompleted: { // Indicates whether the course is marked as completed or not
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  /**
   * Reverts the migration, dropping the 'Registers' table.
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Registers');
  }
};
