const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./Util/database'); 
const userRoutes = require('./Routes/userroutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));

app.use(userRoutes);


const startServer = async () => {
  try {
    // await sequelize.sync();
    await sequelize.sync({force:true})
    app.listen(9000, () => {
      console.log('Server is running on port 9000');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
