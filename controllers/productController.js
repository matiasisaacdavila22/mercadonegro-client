
const { Product, Brand, Color, Category } = require('../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    
    index(req, res) {
         Product
            .findAll({
               include: ['brand','store','category']
            })
            .then(products => {
       //       res.json(products)
       console.log(products) 
              return res.render('products/index', { products });
            })
            .catch(error => res.send(error));

    },
    show: (req, res) => {
        console.log('----------ENTRE AL Show----------');
        Product
            .findByPk(req.params.id, {
                include: ['brand', 'category'],
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
    create: async (req, res) => {
        let brands = await Brand.findAll();
        let colors = await Color.findAll();
        let categories = await Category.findAll();
        return res.render('products/create', { brands, colors, categories});
    },

    store: (req, res) => {
       let errors = validationResult(req);
       if(errors.isEmpty()){
        const _body = req.body;
        _body.image = req.file ? req.file.filename : '';
        _body.storeId = 1;
        console.log(req.body);
        Product
            .create(req.body)
            .then(productStored => {
                // Asociar los colores que querés al producto creado
                productStored.addColors(req.body.colors);

                return res.redirect(`products/${productStored.id}`);
            })
            .catch(error => res.send(error));
        }   
        return res.render('products/create', {errors: errors.mapped(), old:req.body});  
    },

    edit: async (req, res) => {
        let brands = await Brand.findAll();
        let colors = await Color.findAll();
        let product = await Product.findByPk(req.params.id, { include: ['brand', 'colors'] });
       
        return res.render('products/edit', { product, colors, brands });
    },
    update: (req, res) => {
        let product = req.body;
        console.log(req.file)
        product.image = req.file ? req.file.filename : req.body.oldImage;

        Product.update(product, {
            where: {id: req.params.id}
        })
        .then(result => {
            return res.redirect(`/products/${req.params.id}`);
        })
        .catch(error => res.send(error));

        
    },
    destroy: async (req, res) => {
        let categoryId = req.params.id;
        Category
        .destroy({where: {id: categoryId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/category/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/category/destroy/:id'
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