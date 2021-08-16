const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/userController');
const validations = require('../../middlewares/validationsMiddleware');

router.post('/signup', controller.signup);

router.post('/signin', controller.signin);

router.post('/password-reset', validations.validetStoreCreate, controller.reset);

router.post('/ChangePassword', controller.changePassword);

module.exports = router;