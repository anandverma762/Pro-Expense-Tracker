const User = require("../Models/user");
const bcrypt = require("bcrypt");
const Expense = require("../Models/expense");
const jwt = require("jsonwebtoken");

const secretkey =
  "bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh";

function generateAccessToken(userId, name) {
  return jwt.sign({ userId: userId, name: name }, secretkey);
}

exports.signUpUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await User.create({ name: name, email: email, password: hashedPassword });
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
    } else {
      const result = await bcrypt.compare(password, user.password);

      if (result === true) {
        res
          .status(200)
          .json({
            redirect: "/user.html",
            token: generateAccessToken(user.id, user.name),
          });
      } else {
        res.status(401).json({ message: "User not authorized" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const result = await req.user.getExpenses();
    res.status(200).json({ data: result, ispremium: req.user.ispremiumuser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postExpenses = async (req, res, next) => {
  try {
    const expense = await req.user.createExpense(req.body);
    const amount = parseInt(req.body.amount);
    req.user.totalamount += amount; // Add the parsed amount to totalamount
    await req.user.save(); // Save the updated totalamount
    res.status(201).json({ message: "Expense Added", totalamount: req.user.totalamount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteExpense = async (req, res, next) => {
  const exid = req.params.id;

  try {
    const expense = await Expense.findOne({ where: { id: exid } });

    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      const userId = expense.userId;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const newTotal = user.totalamount - expense.amount;
        await user.update({ totalamount: newTotal });
        await expense.destroy();
        res.status(200).json({ message: "Deleted Successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
