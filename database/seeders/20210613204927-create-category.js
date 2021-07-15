'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 Example:
      await queryInterface.bulkInsert('Categories', [{
        name: 'audio',
        photo:'',
        condition:1
      },
      {
        name: 'video',
        photo:'',
        condition:1
      },
      {
        name: 'teclados',
        photo:'',
        condition:1
      },
      {
        name: 'mouses',
        photo:'',
        condition:1
      },
      {
        name: 'insumos',
        photo:'',
        condition:1
      },
      {
        name: 'toner',
        photo:'',
        condition:1
      },
    {
      name: 'auriculares',
      photo:'',
      condition:1
    },
    {
      name: 'memorias',
      photo:'',
      condition:1
    },
    {
      name: 'camaras',
      photo:'',
      condition:1
    },
    {
      name: 'cartuchos',
      photo:'',
      condition:1
    },
    {
      name: 'herramientas',
      photo:'',
      condition:1
    },
    {
      name: 'monitores',
      photo:'',
      condition:1
    },
    {
      name: 'computadoras',
      photo:'',
      condition:1
    },
    {
      name: 'placas de video',
      photo:'',
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
