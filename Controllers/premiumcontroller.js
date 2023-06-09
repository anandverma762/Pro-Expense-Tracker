const User = require('../Models/user');
const Expense = require('../Models/expense');
const sequelize = require('../Util/database');

exports.showleader = async (req, res, next) => {
  try {
    const amountAndName = await User.findAll({
      attributes: ['name', 'totalamount'],
      order: [['totalamount', 'DESC']]
    });
   
    
    res.status(200).json({ ldr: amountAndName });
    
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
