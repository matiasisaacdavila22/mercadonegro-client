'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 Example:
      await queryInterface.bulkInsert('Colors', [{
        name: 'blanco',
        condition:1
      },
      {
        name: 'negro',
        condition:1
      },
      {
        name: 'azul',
        condition:1
      },
      {
        name: 'amarillo',
        condition:1
      },
      {
        name: 'verde',
        condition:1
      },
      {
        name: 'rojo',
        condition:1
      },
      {
        name: 'naranja',
        condition:1
      },
      {
        name: 'marron',
        condition:1
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
