const userController = require('../Controllers/usercontroller');
const express = require('express');

const router = express.Router();

router.get('/expense',userController.getExpenses);

router.post('/expensedata',userController.postExpenses);

router.post('/delete/:id',userController.deleteExpense);

module.exports = router;
