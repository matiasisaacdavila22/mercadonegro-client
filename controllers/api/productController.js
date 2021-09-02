const authService = require('../../services/authService');
const { Product, Brand, Color, Category, Image } = require('../../database/models');
const {validationResult} = require('express-validator')

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    pool: { max: 5, min: 0, idle: 10000 },
  }
);

module.exports = {
    
    index :(req, res) => {
        const portalUrl = req.headers.host
        console.log(portalUrl)
        console.log(req.headers.origin)
        const token = req.headers.authorization.split(' ')[1];;
        let perfil = authService.VerifyToken(token)
        .then((data) => {
            Product
            .findAll({
                where:{storeId:data._id},
                    include: ['brand','store','category','images']
            })
            .then(products => {
              return res.status(200).json(products );
            })
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

    store: async (req, res) => {
        console.log(req.body)
        let errors = validationResult(req);
        if(errors.isEmpty()){
        const t = await sequelize.transaction();
        try {
            const _body = req.body;
            _body.condition = 1;
           // _body.photo = req.file ? req.file.filename : '';
            const token = req.headers.authorization.split(' ')[1];;
            let perfil = authService.VerifyToken(token)
            .then(data => {
                _body.storeId = data._id,
               Product.create(req.body,{ transaction: t })
                .then(product => {
                    const imageNew = {
                        name: _body.photo,
                        orden: 1,
                        productId: product.id,
                        condition: 1,
                    }
                   Image
                      .create(imageNew, { transaction: t })
                      .then(image => {
                        t.commit();
                        return res.status(200).json('todo ok');
                      }) 
                })             
             })
            
            
        }catch(error) {
            if (t) await t.rollback();
            console.log("rollback");
            console.log("el error es :" + e.message);
        } 
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

     status:async (req, res) => {
         try {
            console.log(req.body.status)
            console.log(req.params.id)
        product = await Product.update({
                condition:req.body.status,
            }, {
                where: {
                    id: req.params.id,
                }
            });
            return res.status(200).json(product);
         } catch (error) {
             console.log(error);
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
        const t = await sequelize.transaction()
      try {
         let productId = req.params.id;
         await Image.destroy({ where: { productId: productId },
              force: true },
             { transaction: t }
             );
        let productDeleted = await Product.destroy({
                where: {
                  id: productId
                },force: true
              }, { transaction: t });

         await t.commit();
            if(productDeleted){
                  return res.status(200).json(productDeleted);
            }   
       } catch (error) {
         if (t) await t.rollback();
           console.log("rollback")
           return res.status(500).json(error);
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