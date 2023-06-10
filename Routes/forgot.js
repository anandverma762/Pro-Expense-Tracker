const userAuthenticate = require('../Middleware/auth');
const forgotController = require('../Controllers/forgotcont');

const express = require('express');

const router = express.Router();

router.post('/forgotpassword',forgotController.forgotpass);

router.get('/resetpassword/:uuid',forgotController.resetpass);

router.post('/updatepass',forgotController.updatepass);


module.exports = router;
