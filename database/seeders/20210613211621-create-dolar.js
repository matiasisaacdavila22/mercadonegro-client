'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 Example:
      await queryInterface.bulkInsert('Dolars', [      {
        cost: 100,
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
