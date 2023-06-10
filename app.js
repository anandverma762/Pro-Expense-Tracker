const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./Util/database'); 
const userRoutes = require('./Routes/userroutes');
const expenseRoutes = require('./Routes/expenserout');
const Expense = require('./Models/expense');
const User = require('./Models/user');
const Order = require('./Models/order');
const purchaserout = require('./Routes/purchase');
const premiumrout = require('./Routes/premium');
const forgotrout = require('./Routes/forgot');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));

app.use('/user', userRoutes);
app.use(expenseRoutes);
app.use('/purchase',purchaserout)
app.use('/premium',premiumrout);
app.use('/password',forgotrout);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

const startServer = async () => {
  try {
    await sequelize.sync();
    // await sequelize.sync({force:true})
    app.listen(9000, () => {
      console.log('Server is running on port 9000');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
