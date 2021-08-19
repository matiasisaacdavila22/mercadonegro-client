const { body } = require("express-validator");
const path = require("path");
const { Product, Category, User, Brand, Store } = require("../database/models");
const cadena = ["puta", "puto", "mierda", "putas", "putos", "mierdas"];

const validations = {
  ///USER///
  validetUserCreate: [
    body("name")
      .notEmpty()
      .withMessage("ingresar el Nombre")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida en name");
          }
        }
        return true;
      }),
    body("userName")
      .notEmpty()
      .withMessage("Completa con tu Nombre de Usuario!")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida userName");
          }
        }
        return true;
      }),
    body("email")
      .isEmail()
      .withMessage("debes ingresar un Email Valido")
      .bail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({
          where: { email: req.body.email },
        });
        if (user) {
          throw new Error("Email ya Existe!");
        }
        return true;
      }),

    body("fecha").notEmpty().withMessage("Ingresa una Fecha!"),
    body("domicilio")
      .notEmpty()
      .withMessage("Completa con tu Direccion!")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida domicilio");
          }
        }
        return true;
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage(
        "coloca una clave mayor a 8 digitos pueden ser numero y letras!"
      ),
    body("password2").custom((value, { req }) => {
      if (!req.body.password) {
        throw new Error("ingresa una clave");
      }
      if (!req.body.password2) {
        throw new Error("repite tu clave");
      }
      let password = req.body.password;
      let password2 = req.body.password2;

      if (password != password2) {
        throw new Error("Error las claves ingresadas son Distintas");
      }
      return true;
    }),
  ],
///LOGIN///
  validetUserLogin: [
    body("userName")
      .notEmpty()
      .withMessage("Ingreasa con tu Nombre de Usuario!"),
    body("password").notEmpty().withMessage("coloca tu clave"),
  ],
///PRODUCT///
  productValidation: [
    body("categoryId").not().isIn("0").withMessage("Selecciona una Categoria"),
    body("name")
      .notEmpty()
      .withMessage("ingresar el Nombre del producto")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida name");
          }
        }
        return true;
      }),
    body("model")
      .isLength({ max: 100 })
      .withMessage(
        "el nombre del modelo debe ser mas corto hasta 30 caracteres"
      )
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida model");
          }
        }
        return true;
      }),
    body("description")
      .notEmpty()
      .withMessage("agrega una descripcion")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida despription");
          }
        }
        return true;
      }),
    body("stock")
      .notEmpty()
      .withMessage("introduce la cantidad")
      .bail()
      .isNumeric()
      .withMessage("este campo deve ser un Numero")
      .bail()
      .custom((value) => {
        if (value < 0) {
          console.log("el stock es negativo");
          throw new Error("el stock no puede ser menor a 0");
        }
        return true;
      }),
    body("price")
      .notEmpty()
      .withMessage("indicar el precio $")
      .bail()
      .isNumeric()
      .withMessage("este campo deve ser un Numero")
      .bail()
      .custom((value) => {
        if (value < 1) {
          console.log("el costo es negativo");
          throw new Error("el precio no puede ser menor a $1");
        }
        return true;
      }),
    body("cost")
      .notEmpty()
      .withMessage("indicar el precio $")
      .bail()
      .isNumeric()
      .withMessage("este campo deve ser un Numero")
      .bail()
      .custom((value) => {
        if (value < 0) {
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
///IMAGE///
  validetProductImage: [
    body("orden")
      .notEmpty()
      .bail()
      .isNumeric()
      .withMessage("ingrese un numero de Orden"),
    body("productId")
      .notEmpty()
      .bail()
      .isNumeric()
      .withMessage("Error id imagen"),
  ],

  ///////////////////////////////////////////////API////////////////////////
  ///STORE///
  validetStoreCreate: [
    body("name")
      .notEmpty()
      .withMessage("ingresar el Nombre")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida en name");
          }
        }
        return true;
      }),
    body("storeName")
      .notEmpty()
      .withMessage("Ingresa el Nombre del Store!")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida StoreName");
          }
        }
        return true;
      })
      .bail()
      .custom(async (value, { req }) => {
        const store = await Store.findOne({
          where: { name: req.body.storeName },
        });
        if (store) {
          throw new Error("Store name alredy in use!");
        }
        return true;
      }),
    body("storeAddress")
      .notEmpty()
      .withMessage("Completa con tu Direccion!")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida StoreAddress");
          }
        }
        return true;
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage(
        "coloca una clave mayor a 8 digitos pueden ser numero y letras!"
      ),
    body("storePhone").notEmpty().withMessage("Ingresa tu telefono!"),
    body("storeEmail")
      .isEmail()
      .withMessage("ingresar un Email Valido")
      .bail()
      .custom(async (value, { req }) => {
        const store = await Store.findOne({
          where: { email: req.body.storeEmail },
        });
        if (store) {
          throw new Error("Store Email ya Existe!");
        }
        return true;
      }),
    body("lastName")
      .notEmpty()
      .withMessage("Completa con tu Nombre de Usuario!")
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida lastname");
          }
        }
        return true;
      }),
    body("email")
      .isEmail()
      .withMessage("debes ingresar un Email Valido")
      .bail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({
          where: { email: req.body.email },
        });
        if (user) {
          throw new Error("Email ya Existe!");
        }
        return true;
      }),
  ],
  ///CATEGORY///
  validetCategory: [
    body("name")
      .notEmpty()
      .withMessage("Ingresa un Nombre para la categoria!")
      .bail()
      .isLength({ max: 80 })
      .withMessage(
        "el nombre de la categoria debe ser mas corto, hasta 80 caracteres"
      )
      .bail()
      .custom((value) => {
        let name = " " + value.toLowerCase() + " ";
        for (let i = 0; i < cadena.length; i++) {
          if (name.includes(` ${cadena[i]} `)) {
            throw new Error("palabra prohibida name");
          }
        }
        return true;
      })
      .bail()
      .custom(async (value, { req }) => {
        const category = await Category.findOne({
          where: { name: req.body.name },
        });
        if (category && category.id != req.body.id) {

          throw new Error("category name alredy in use!");
        }
        return true;
      }),
    body("file").custom((value, { req }) => {
     /* console.log(req.body);
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
      }*/
      return true;
    }),
  ],

  ///BRAND///
  validatedBrand: [
    body("name")
    .notEmpty()
    .withMessage("Ingresa el Nombre!")
    .bail()
    .isLength({ max: 80 })
    .withMessage(
      "el nombre de la brand debe ser mas corto, hasta 80 caracteres"
    )
    .custom((value) => {
      let name = " " + value.toLowerCase() + " ";
      for (let i = 0; i < cadena.length; i++) {
        if (name.includes(` ${cadena[i]} `)) {
          throw new Error("palabra prohibida in name");
        }
      }
      return true;
    })
    .bail()
    .custom(async (value, { req }) => {
      const brand = await Brand.findOne({
        where: { name: req.body.name },
      });
      if (brand && brand.id != req.body.id) {
        throw new Error("brand name alredy in use!");
      }
      return true;
    }), 
  ]
};

module.exports = validations;
