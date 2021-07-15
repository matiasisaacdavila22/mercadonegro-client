const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/userController');

router.post('/signup', controller.signup);

router.post('/signin', controller.signin);

router.post('/password-reset', controller.reset);

router.post('/ChangePassword', controller.changePassword);

module.exports = router;