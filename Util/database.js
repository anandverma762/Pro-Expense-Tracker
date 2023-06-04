const Seq = require('sequelize');

const sequelize = new Seq('expense','root','My2023' ,{ dialect: 'mysql',host: 'localhost'})

module.exports = sequelize;