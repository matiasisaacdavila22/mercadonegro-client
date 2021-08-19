const { Store } = require('../../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    
    index :async (req, res) => {
        const allstores = await Store.findAll();
            if(!allstores) return res.status(500).json('not found');    
            return res.status(200).json(allstores);
    },

    show: async (req, res) => {
        try {
            let id = req.params.id;
            let store = await Store.findByPk(id);
            return res.status(200).json(store);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    create: async (req, res) => {

    },

    store: (req, res) => {
       let errors = validationResult(req);
        console.log(req.body)
        console.log(errors);
       if(errors.isEmpty()){
        const brand = req.body;
        brand.photo = req.file ? req.file.filename : '';
          Brand
          .create(brand)
             .then(confirm => {
                return res.status(200).json(confirm);
            })
            .catch((error => {
                return res.status(500).json(error);
            }))
           
        }else{
            return res.status(500).json(errors);
        }   
         
    },

    edit: async (req, res) => {
      let id = req.params.id;
        let brand = await Brand.findByPk(id);
        return res.status(200).json(brand);
      
    },
    update: (req, res) => {
        console.log(req.body);
        console.log(req.body.id)
      try {
            let errors = validationResult(req);
           
          if(errors.isEmpty()){
            const brand = {
             id:req.body.id,
             name:req.body.name,
             }
             brand.photo = req.file ? req.file.filename : req.body.oldPhoto;
              console.log(brand);
    
            Brand.update(brand, {
                 where: {id: brand.id}})
                 .then(confirm => {
                    return res.status(200).json(confirm); 
                 })
                 .catch(error => res.send(error))
             }else{
                 console.log(errors)
                return res.status(401).json(errors);
             } 
        } catch (error) {
            console.log('ocurrio un erro en la acualizacion de brand')
        }
     },

    destroy: (req, res) => {
        let brandId = req.params.id;
        Brand
        .destroy({where: {id:brandId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/brand/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/brand/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error)) 
    },
    cart: (req, res) => {        
        res.render('products/cart');
    },    
    test: async (req, res) => {
        let colors = await Color.findAll({ include: ['products'] });
        return res.send(colors);
    }
}