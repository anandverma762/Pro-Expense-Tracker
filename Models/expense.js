const Seq = require('sequelize');

const sequelize = require('../Util/database');

const Expense = sequelize.define('expense',{
    id: {
        type:  Seq.INTEGER,
        allowNull:  false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        
    },
    amount: {
        type: Seq.INTEGER,
        allowNull: false,
    },
    description: {
        type: Seq.TEXT,
        allowNull: false
    },
    category: {
        type: Seq.CHAR,
        allowNull: false
    }
})

module.exports = Expense;