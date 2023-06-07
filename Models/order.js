const Seq = require('sequelize');

const sequelize = require('../Util/database');

const Order = sequelize.define('order',{
    id: {
        type:  Seq.INTEGER,
        allowNull:  false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        
    },
    paymentId: {
        type: Seq.STRING,
    },
    orderId: {
        type: Seq.STRING,
        allowNull: false
    },
    status: {
        type: Seq.STRING,
        allowNull: false
    }
})

module.exports = Order;