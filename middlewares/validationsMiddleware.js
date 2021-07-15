const { body } = require('express-validator');
const path = require('path');
const models = require('../database/models');
const cadena = ['puta','puto','mierda', 'putas','putos','mierdas'];     

const validations = {
    validetUserCreate : [
    body('name').notEmpty().withMessage('Ingresa tu Nombre!'), 
    body('userName').notEmpty().withMessage('Completa con tu Nombre de Usuario!'), 
    body('email').isEmail().withMessage('ingresar un Email Valido').bail().custom(value => {
      return Store.findOne(Store,{
          where: {email: value}})
          .then(store => {
            return Promise.reject('E-mail already in use');
          })
        }),   
 
    body('fecha').notEmpty().withMessage('Ingresa una Fecha!'), 
    body('domicilio').notEmpty().withMessage('Completa con tu Direccion!'), 
    body('password').isLength({ min: 8 }).withMessage('coloca una clave mayor a 8 digitos pueden ser numero y letras!'), 
    body('password2').custom((value, {req}) => {
		if(!req.body.password){
            throw new Error('ingresa una clave');
        }
        if(!req.body.password2){
            throw new Error('repite tu clave');
        }
        let password = req.body.password;
        let password2 = req.body.password2;

        if(password != password2){
			throw new Error('Error las claves ingresadas son Distintas');
		}
		return true;
        
	})
 ],

    validetUserLogin : [
    body('userName').notEmpty().withMessage('Ingreasa con tu Nombre de Usuario!'), 
    body('password').notEmpty().withMessage('coloca tu clave') 
    ],

    productValidation : [
    body("categoryId").not().isIn("0").withMessage("Selecciona una Categoria"),
    body("name").notEmpty().withMessage("ingresar el Nombre del producto").bail().custom(value => {
      let name = ' '+value.toLowerCase()+' ';
      for(let i= 0; i < cadena.length; i++) {
        if(name.includes(` ${cadena[i]} `)){
          throw new Error("palabra prohibida");
        }
      };
      return true;
    }),
    body('model').isLength({ max: 100 }).withMessage('el nombre del modelo debe ser mas corto hasta 30 caracteres').bail().custom(value => {
      let name = ' '+value.toLowerCase()+' ';
      for(let i= 0; i < cadena.length; i++) {
        if(name.includes(` ${cadena[i]} `)){
          throw new Error("palabra prohibida");
        }
      };
      return true;
    }), 
    body("description").notEmpty().withMessage("agrega una descripcion").bail().custom(value => {
      let name = ' '+value.toLowerCase()+' ';
      for(let i= 0; i < cadena.length; i++) {
        if(name.includes(` ${cadena[i]} `)){
          throw new Error("palabra prohibida");
        }
      };
      return true;
    }),
    body("stock").notEmpty().withMessage("introduce la cantidad").bail().isNumeric().withMessage("este campo deve ser un Numero").bail().custom(value => {
      if(value < 0){
        console.log("el stock es negativo");
        throw new Error("el stock no puede ser menor a 0");
      }
      return true;
    }),
    body("price").notEmpty().withMessage("indicar el precio $").bail().isNumeric().withMessage("este campo deve ser un Numero").bail().custom(value => {
      if(value < 1){
        console.log("el costo es negativo");
        throw new Error("el precio no puede ser menor a $1");
      }
      return true;
    }),
    body("cost").notEmpty().withMessage("indicar el precio $").bail().isNumeric().withMessage("este campo deve ser un Numero").bail().custom(value => {
      if(value < 0){
        console.log("el costo es negativo");
        throw new Error("el costo no puede ser menor a 0");
      }
      return true;
    }),
    body("file").custom((value, { req }) => {
      
  /*    let acceptedExtensions = [".jpg", ".npg", ".gif"];
      if (!value) {
        console.log("no tiene un file");
        if (req.body.oldFile) {
          console.log("pero tiene un fileOld");
          return true;
        } else {
          throw new Error("Tienes que subir una imagen");
        }
      }
      let fileExtension = path.extname(req.file.originalname);
  
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `las Extensiones permitidas son ${acceptedExtensions.join(", ")}`
        );
      }*/
      return true;
    }),
  ],
  
  validetProductImage: [
    body('orden').notEmpty().bail().isNumeric().withMessage("ingrese un numero de Orden"),
    body('productId').notEmpty().bail().isNumeric().withMessage("Error id imagen"),
  ],

  validetCategory : [
    body('name').notEmpty().withMessage('Ingresa un Nombre para la categoria!').bail()
    .isLength({ max: 80 }).withMessage('el nombre de la categoria debe ser mas corto, hasta 80 caracteres').bail()
    .custom(value => {
      let name = ' '+value.toLowerCase()+' ';
      for(let i= 0; i < cadena.length; i++) {
        if(name.includes(` ${cadena[i]} `)){
          throw new Error("palabra prohibida");
        }
      };
      return true;
    }),
    body("file").custom((value, { req }) => {
      console.log(req.body)
    let acceptedExtensions = [".jpg", ".npg", ".gif"];
          if (!value) {
            console.log("no tiene un file");
            if (req.body.oldFile) {
              console.log("pero tiene un fileOld");
              return true;
            } else {
              throw new Error("Tienes que subir una imagen");
            }
          }
          let fileExtension = path.extname(req.file.originalname);
      
          if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(
              `las Extensiones permitidas son ${acceptedExtensions.join(", ")}`
            );
          }
          return true;
        }),
    ],
    
}

  module.exports = validations; 