const Seq = require('sequelize');

const sequelize = require('../Util/database');

const User = sequelize.define('user',{
    id: {
        type:  Seq.INTEGER,
        allowNull:  false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        
    },
    email: {
        type: Seq.CHAR,
        allowNull: false,
        unique: true, 
    },
    name: {
        type: Seq.CHAR,
        allowNull: false
    },
    password: {
        type: Seq.CHAR,
        allowNull: false
    },
    totalamount:  {
        type: Seq.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
    ,
    ispremiumuser: {
        type:Seq.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = User;