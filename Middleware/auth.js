const jwt = require('jsonwebtoken');
const User = require('../Models/user');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secretKey = 'bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh';
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const userId = decoded.userId;

      User.findByPk(userId)
        .then(user => {
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          req.user = user;
          next();
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Internal Server Error' });
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
