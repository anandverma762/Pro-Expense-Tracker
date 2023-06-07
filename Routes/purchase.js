const purchaseController = require('../Controllers/purchase');
const userAuthenticate = require('../Middleware/auth');
const userController = require('../Controllers/usercontroller');

const express = require('express');
const rout = require('./userroutes');

const router = express.Router();

router.get('/buypremium',userAuthenticate.authenticate,purchaseController.purchaseOrder);

router.post('/updatestatus',userAuthenticate.authenticate,purchaseController.updatePurchase);

module.exports = router;
