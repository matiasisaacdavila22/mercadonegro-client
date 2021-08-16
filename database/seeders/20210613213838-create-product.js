'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 Example:
      await queryInterface.bulkInsert('Products', [{
        name: 'Auriculares In Ear Genius Hs M228 Mic Celular Blanco Y Negro',
        model: 'hs-m288',
        description:'Nombre del modelo HS-M228 Tipo ln-ear Conectividad Conector de 3,5 mm Unidad de potencia (mm) F 10 mm Frecuencia 20~20KHz (at 1KHz Output S.P.L ±10dB)',
        price:600,
        cost:300,
        stock:10,
        keywords:'audio',
        condition:1,
        storeId:1,
        brandId:1,
        categoryId:1
      },
      {
        name: 'Auriculares In Ear Genius Hs M228 Mic Celular Blanco Y Negro',
        model: 'hs-m288',
        description:'Nombre del modelo HS-M228 Tipo ln-ear Conectividad Conector de 3,5 mm Unidad de potencia (mm) F 10 mm Frecuencia 20~20KHz (at 1KHz Output S.P.L ±10dB)',
        price:600,
        cost:300,
        stock:10,
        keywords:'audio',
        condition:1,
        storeId:1,
        brandId:1,
        categoryId:1
      },
      {
        name: 'Auriculares In Ear Genius Hs M228 Mic Celular Blanco Y Negro',
        model: 'hs-m288',
        description:'Nombre del modelo HS-M228 Tipo ln-ear Conectividad Conector de 3,5 mm Unidad de potencia (mm) F 10 mm Frecuencia 20~20KHz (at 1KHz Output S.P.L ±10dB)',
        price:600,
        cost:300,
        stock:10,
        keywords:'audio',
        condition:1,
        storeId:1,
        brandId:1,
        categoryId:1
        },
        {
          name: 'Auriculares In Ear Genius Hs M228 Mic Celular Blanco Y Negro',
          model: 'hs-m288',
          description:'Nombre del modelo HS-M228 Tipo ln-ear Conectividad Conector de 3,5 mm Unidad de potencia (mm) F 10 mm Frecuencia 20~20KHz (at 1KHz Output S.P.L ±10dB)',
          price:600,
          cost:300,
          stock:10,
          keywords:'audio',
          condition:1,
          storeId:1,
          brandId:1,
          categoryId:1
        },
        {
          name: 'Auriculares In Ear Genius Hs M228 Mic Celular Blanco Y Negro',
          model: 'hs-m288',
          description:'Nombre del modelo HS-M228 Tipo ln-ear Conectividad Conector de 3,5 mm Unidad de potencia (mm) F 10 mm Frecuencia 20~20KHz (at 1KHz Output S.P.L ±10dB)',
          price:600,
          cost:300,
          stock:10,
          keywords:'audio',
          condition:1,
          storeId:1,
          brandId:1,
          categoryId:1
        },
        {
          name: 'Auriculares In Ear Genius Hs M228 Mic Celular Blanco Y Negro',
          model: 'hs-m288',
          description:'Nombre del modelo HS-M228 Tipo ln-ear Conectividad Conector de 3,5 mm Unidad de potencia (mm) F 10 mm Frecuencia 20~20KHz (at 1KHz Output S.P.L ±10dB)',
          price:600,
          cost:300,
          stock:10,
          keywords:'audio',
          condition:1,
          storeId:1,
          brandId:1,
          categoryId:1
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
