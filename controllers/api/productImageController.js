const { Image } = require('../../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    
    index :async (req, res) => {
        const allbrands = await Brand.findAll();
            if(!allbrands) return res.status(401).send('not found');    
            return res.status(200).json(allbrands);
    },
    show: (req, res) => {
        Image
            .findAll( {
                where: {productId: req.params.id}})
            .then(images => {
                return res.status(200).json(images);
            })
            .catch(error => {
              return res.status(401).json(error);
            })
        },

    store: (req, res) => {
        console.log("I am create image new")
        console.log(req.body)
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
            return res.status(500).json(errors);
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
             const image = req.body;
             image.name = req.file ? req.file.filename : '';
             console.log('entre a validar imagen');
    
             Image.update(image, {
                 where: {id: image.id}})
                 .then(confirm => {
                    return res.status(200).json(confirm); 
                 })
                 .catch(error => res.send(error))
             }else{
                return res.status(401).json(errors);
             } 
        } catch (error) {
            console.log('ocurrio un erro en la acualizacion de image')
        }

    },
    destroy: (req, res) => {
        let imageId = req.params.id;
        Image
        .destroy({where: {id:imageId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
                  respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/image/destroy/:id'
                    },
                    data:confirm
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