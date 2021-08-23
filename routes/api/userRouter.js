const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/userController');
const validations = require('../../middlewares/validationsMiddleware');

router.get('/:id', controller.edit);

router.post('/', controller.userById);

router.post('/signup',  validations.validetStoreCreate, controller.signup);

router.post('/signin', controller.signin);

router.post('/password-reset', controller.reset);

router.post('/ChangePassword', controller.changePassword);


module.exports = router;