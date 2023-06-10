const Seq = require('sequelize');

const sequelize = require('../Util/database');

const fpr = sequelize.define('forgotpasswordrequests',{
    id: {
        type:  Seq.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Seq.INTEGER,
        allowNull: false,
    },
    isactive: {
        type: Seq.BOOLEAN,
    }
    
})

module.exports = fpr;