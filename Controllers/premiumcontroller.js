const User = require('../Models/user');
const Expense = require('../Models/expense');
const sequelize = require('../Util/database');

exports.showleader = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id','name']
    });
    const expenses = await Expense.findAll({
      attributes: [
        'userId',
        [sequelize.fn('sum', sequelize.col('amount')), 'total']
      ],
      group: ['userId']
    });
    
    
    const amountAndName = [];
    
    users.forEach((user) => {
      const userId = user.id;
      const expense = expenses.find((item) => item.userId === userId);
      const total = expense ? expense.dataValues.total : 0;
      amountAndName.push({ name: user.name, amount: total });
    });
    
    // Sort the array in descending order based on the amount
    amountAndName.sort((a, b) => b.amount - a.amount);
    
    res.status(200).json({ ldr: amountAndName });
    
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
