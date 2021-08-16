
const { Product, Brand, Color, Category } = require('../../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    
    index :(req, res) => {
        Product
        .findAll({
           include: ['brand','store','category','images']
        })
        .then(products => {
   //       res.json(products)
   console.log(products) 
          return res.status(200).json(products );
        })
        .catch(error => {
          return res.status(401).json(error);
        });
        
    },
    show: (req, res) => {
        console.log('----------ENTRE AL Show----------');
        Product
            .findByPk(req.params.id, {
                include: ['brand', 'categories'],
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
        let errors = validationResult(req);
        if(errors.isEmpty()){
         const _body = req.body;
         _body.photo = req.file ? req.file.filename : '';
           Product
           .create(req.body)
              .then(confirm => {
                 return res.status(200).json(confirm);
             })
             .catch((error => {
                 return res.status(401).json(error);
             }))
            
         }else{
            console.log(errors)
             return res.status(401).json(errors);
         }    
     },

    edit: async (req, res) => {
        try{
        let brands = await Brand.findAll();
        let categories = await Category.findAll();
        let product = await Product.findByPk(req.params.id, { include: ['brand', 'category'] });     
        return res.status(200).json(product,brands,categories);
        }catch{
            return res.status(400).json('products no found');
        }
    },


    update:async (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
         const _body = req.body;
         _body.photo = req.file ? req.file.filename : '';
         let product = req.body;

         Product.update(product, {
            where: {id: req.body.id}
        })
         .then(confirm => {
                 return res.status(200).json(confirm);
             })
             .catch((error => {
                 return res.status(401).json(error);
             }))
            
         }else{
             console.log(errors)
             return res.status(401).json(errors);
         } 
    },
    destroy: async (req, res) => {
        try{
        await Product.destroy({ where: {id: req.params.id}});
        return res.status(200).json('product remove succesfully')
        }catch(error){
        return res.status(400).json('error en backend');
        }
    },
    cart: (req, res) => {        
        res.render('products/cart');
    },    
    test: async (req, res) => {
        let colors = await Color.findAll({ include: ['products'] });
        return res.send(colors);
    }
}