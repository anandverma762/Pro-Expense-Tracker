const User = require('../Models/user');

exports.signUpUser = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then(() => {
            res.status(201).json({ message: 'User created successfully' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
          });
        
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
  console.log("logged in")
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        if (user.password === password) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};
