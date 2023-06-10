const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const { promisify } = require('util');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secretKey = 'bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh';
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const verify = promisify(jwt.verify);
    try {
      const decoded = await verify(token, secretKey);
      const userId = decoded.userId;

      try {
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
