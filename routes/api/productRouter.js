const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('../../controllers/api/productController');
const validations = require('../../middlewares/validationsMiddleware');
const getMulterStorageConfig = require('../../middlewares/multerMiddleware');
let getstorage = getMulterStorageConfig('../../public/images/products','product');
const verifyAdmin = require('../../middlewares/api/verifyAdmin');
const verifyManager = require('../../middlewares/api/verifyManager');
const verifySeller = require('../../middlewares/api/verifySeller');
const upload = multer({ storage: getstorage, limits: 1024 * 1024 });

router.get('/test', controller.test);

// Listado de productos (GET)
router.get('/', verifySeller, controller.index);

// Formulario de creación de productos (GET)
router.get('/cart',verifySeller, controller.cart);

// Formulario de creación de productos (GET)
//router.get('/create',verifyAdmin, controller.create);

// Detalle de un producto particular (GET)
router.get('/:id',verifySeller, controller.show);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/',verifyAdmin, upload.single('image'), validations.productValidation, controller.store);

// Formulario de edición de productos (GET)
router.get('/:id/edit',verifyManager, controller.edit);

router.put('/:id/status',verifyManager, controller.status);

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/',verifyManager, upload.single('image'), validations.productValidation, controller.update);

// Acción de borrado (DELETE)
router.delete('/:id',verifyAdmin, controller.destroy);


module.exports = router;