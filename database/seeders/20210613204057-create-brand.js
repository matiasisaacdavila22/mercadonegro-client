'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   Example:
      await queryInterface.bulkInsert('Brands', [{
        name: 'genius',
        photo:'',
        condition:1,
      },
      {
        name: 'noga',
        photo:'',
        condition:1
      },
      {
        name: 'netmak',
        photo:'',
        condition:1
      },
      {
        name: 'philips',
        photo:'',
        condition:1
      },
      {
        name: 'blobal',
        photo:'',
        condition:1
      },
      {
        name: 'logitech',
        photo:'',
        condition:1
      },
    {
      name: 'tecnobive',
      photo:'',
      condition:1
    },
    {
      name: 'starwave',
      photo:'',
      condition:1
    },
    {
      name: 'LG',
      photo:'',
      condition:1
    },
    {
      name: 'sony',
      photo:'',
      condition:1
    },
    {
      name: 'lenovo',
      photo:'',
      condition:1
    },
    {
      name: 'Hp',
      photo:'',
      condition:1
    },
    {
      name: 'wester Digital',
      photo:'',
      condition:1
    },
    {
      name: 'sandisk',
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
