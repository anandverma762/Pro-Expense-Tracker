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
