const User = require('../Models/user');
const Expense = require('../Models/expense');

exports.showleader = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userAndExpense = {};

    expenses.forEach((item) => {
      if (userAndExpense[item.userId]) {
        userAndExpense[item.userId] += item.amount;
      } else {
        userAndExpense[item.userId] = item.amount;
      }
    });

    console.log(userAndExpense);

    const userAndName = {};
    users.forEach((user) => {
      userAndName[user.id] = user.name;
    });
    console.log(userAndName);

    const amountAndName = [];

    for (const userId in userAndExpense) {
      const amount = userAndExpense[userId];
      const name = userAndName[userId];
      amountAndName.push({ amount, name });
    }

    // Sort the array in descending order based on the amount
    amountAndName.sort((a, b) => b.amount - a.amount);

    res.status(200).json({ ldr: amountAndName });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
