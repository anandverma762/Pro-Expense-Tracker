const userAuthenticate = require('../Middleware/auth');
const premiumController = require('../Controllers/premiumcontroller');

const express = require('express');
const rout = require('./userroutes');

const router = express.Router();

router.get('/showldr',userAuthenticate.authenticate,premiumController.showleader);


module.exports = router;
