const userController = require('../Controllers/usercontroller');
const userAuthenticate = require('../Middleware/auth');
const express = require('express');

const router = express.Router();

router.get('/expense',userAuthenticate.authenticate,userController.getExpenses);

router.post('/expensedata',userAuthenticate.authenticate,userController.postExpenses);

router.post('/delete/:id', userController.deleteExpense);

module.exports = router;
