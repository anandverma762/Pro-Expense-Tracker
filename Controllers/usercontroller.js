const User = require('../Models/user');
const bcrypt = require('bcrypt');
const Expense = require('../Models/expense');

exports.signUpUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const saltRounds = 10;
        bcrypt.hash(password ,saltRounds,(err,result)=>{

        
        User.create({name:name,email:email,password:result})
          .then(() => {
            res.status(201).json({ message: 'User created successfully' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
          });

        })
        
        } else {
        res.status(409).json({ message: 'User already exists' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};




exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Invalid email or password' });
      } else {
        bcrypt.compare(password ,user.password,(err,result)=>{
        if (result === true) {
          res.status(200).json({redirect: '/user.html'})
        } else {
          res.status(401).json({ message: 'User not authorized' });
        }
      })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};

exports.postExpenses = (req,res,next)=>{
  Expense.create(req.body).then(r =>{
    res.status(201).json({message: 'Expense Added'});
  }).catch(err =>{
    res.status(500).json({ message: 'Internal Server Error' });
    
  })
}


exports.deleteExpense = (req,res,next)=>{
  const exid = req.params.id;
  Expense.destroy({where: {id: exid}}).then(r =>{
    res.status(201).json({message: 'Deleted Successfully'})
  }).catch(err =>{
    res.status(500).json({message: 'Internal Server Error'})
  })
}