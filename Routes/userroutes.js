const userController = require('../Controllers/usercontroller');

const express = require('express');

const rout = express.Router();

rout.post('/signup',userController.signUpUser);

rout.post('/login',userController.loginUser);




module.exports = rout;
