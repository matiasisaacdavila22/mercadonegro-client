const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('../../controllers/api/brandController');
const validations = require('../../middlewares/validationsMiddleware');
const getMulterStorageConfig = require('../../middlewares/multerMiddleware');
let getstorage = getMulterStorageConfig('./../public/images/brand','brand');
const upload = multer({ storage: getstorage, limits: 1024 * 1024 });
const verifyAdmin = require('../../middlewares/api/verifyAdmin');
const verifyManager = require('../../middlewares/api/verifyManager');
const verifySeller = require('../../middlewares/api/verifySeller');

router.get('/test', controller.test);

// Listado de productos (GET)
router.get('/', verifySeller, controller.index);


// Detalle de un producto particular (GET)
router.get('/:id',verifySeller, controller.show);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/',verifyAdmin, upload.single('file'),validations.validatedBrand, controller.store);

// Formulario de edición de productos (GET)
router.get('/:id/edit', verifyManager, controller.edit);

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/', verifyManager, upload.single('file'), validations.validatedBrand, controller.update);

// Acción de borrado (DELETE)
router.delete('/:id',verifyAdmin, controller.destroy);


module.exports = router;