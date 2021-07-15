const { Image } = require('../../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    
    index :async (req, res) => {
        const allbrands = await Brand.findAll();
            if(!allbrands) return res.status(401).send('not found');    
            return res.status(200).json(allbrands);
    },
    show: (req, res) => {
        console.log('----------ENTRE AL Show----------');
        Product
            .findByPk(req.params.id, {
                include: ['brand', 'colors'],
            })
            .then(product => {
                if (product) {
                //    res.json(product)
                    res.render('products/show', { product });
                } else {
                    res.render('products/404');
                }
            })
            .catch(error => res.send(error));
    },

    store: (req, res) => {
        console.log(req.file)
       let errors = validationResult(req);
      
       if(errors.isEmpty()){
       
        const imageNew = {
            name: req.file.filename,
            orden: req.body.orden,
            productId: req.body.productId,
            condition: 1,
        }
          Image
          .create(imageNew)
             .then(confirm => {
                return res.status(200).json(confirm);
            })
            .catch((error => {
                return res.status(401).json(error);
            }))
           
        }else{
            console.log(errors)
            return res.status(200).json(errors);
        }   
         
    },

    edit: async (req, res) => {
      let id = req.params.id;
        let brand = await Brand.findByPk(id);
        return res.status(200).json(brand);
      
    },
    update: (req, res) => {
        try {
            let errors = validationResult(req);
            if(errors.isEmpty()){
             const brand = req.body;
             brand.photo = req.file ? req.file.filename : '';
             console.log(brand);
    
            Brand.update(brand, {
                 where: {id: brand.id}})
                 .then(confirm => {
                    return res.status(200).json(confirm); 
                 })
                 .catch(error => res.send(error))
             }else{
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