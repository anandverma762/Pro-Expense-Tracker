const userAuthenticate = require('../Middleware/auth');
const forgotController = require('../Controllers/forgotcont');

const express = require('express');

const router = express.Router();

router.post('/forgotpassword',forgotController.forgotpass);


module.exports = router;
