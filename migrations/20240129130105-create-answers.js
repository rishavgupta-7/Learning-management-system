'use strict';

/**
 * Sequelize migration for creating 'Answers' table.
 * This table stores information about answers to questions, including question, answer, options, student answer, associated chapter, user, and timestamps.
 *
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
  /**
   * Applies the migration, creating the 'Answers' table.
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT
      },
      answer: {
        type: Sequelize.TEXT
      },
      option1: {
        type: Sequelize.TEXT
      },
      option2: {
        type: Sequelize.TEXT
      },
      option3: {
        type: Sequelize.TEXT
      },
      studentanswer: {
        type: Sequelize.TEXT
      },
      chapterId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
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
   * Reverts the migration, dropping the 'Answers' table.
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Answers');
  }
};
