const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Payments = sequelize.define('payment',{
    orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    custId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    custEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    txnId: {
        type: Sequelize.STRING
    },
    bankTxnId: {
        type: Sequelize.STRING
    },
    txnAmount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    txnStatus: {
        type: Sequelize.STRING
    },
    checksumSent: {
        type: Sequelize.STRING
    },
    checksumRecv: {
        type: Sequelize.STRING
    },
    respCode: {
        type: Sequelize.STRING
    },
    respMsg: {
        type: Sequelize.TEXT
    },
    txnDate: {
        type: Sequelize.DATE
    },
    gatewayName: {
        type: Sequelize.STRING
    },
    bankName: {
        type: Sequelize.TEXT
    },
    paymentMode: {
        type: Sequelize.STRING
    },
    cardF6: {
        type: Sequelize.STRING
    },
    cardL4: {
        type: Sequelize.STRING
    }
})

module.exports = Payments;
