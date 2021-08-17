const { Category } = require('../../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    
    index :async (req, res) => {
        const allCategory = await Category.findAll();
            if(!allCategory) return res.status(401).send('not found'); 
            console.log(allCategory)   
            return res.status(200).json(allCategory);
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
    create: async (req, res) => {

    },

    store: (req, res) => {
       let errors = validationResult(req);
       console,log(req.body)
       if(errors.isEmpty()){
        const _body = req.body;
        _body.photo = req.file ? req.file.filename : '';
        console.log(req.body);
          Category
          .create(req.body)
             .then(category => {
                return res.status(200).json(category);
            })
            .catch((error => {
                return res.status(401).json(error);
            }))
           
        }else{
            return res.status(200).json(errors);
        }   
         
    },

    edit: async (req, res) => {
      let id = req.params.id;
        let category = await Category.findByPk(id);
        return res.status(200).json(category);
      
    },
    update: (req, res) => {
        try {
            let errors = validationResult(req);
            if(errors.isEmpty()){
             const category = req.body;
             category.photo = req.file ? req.file.filename : '';
             console.log(category);
    
            Category.update(category, {
                 where: {id: category.id}})
                 .then(confirm => {
                    return res.status(200).json(confirm); 
                 })
                 .catch(error => res.send(error))
             }else{
                return res.status(401).json(errors);
             } 
        } catch (error) {
            console.log('ocurrio un erro en la acualizacion de category')
        }

    },
    destroy: async (req, res) => {
        let categoryId = req.params.id;
        Category
        .destroy({where: {id:categoryId}, force: true}) // force: true es para asegurar que se ejecute la acción
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