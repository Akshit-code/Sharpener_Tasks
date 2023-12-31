const sequelize = require('../util/database');
const {DataTypes} = require('sequelize');

const Expense = sequelize.define('expenses', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    desc: {
        type: DataTypes.STRING,
        allowNull:false
    },
    category: {
        type: DataTypes.ENUM('Food', 'Rent', 'Travel', 'Bills'),
        allowNull: false
    },
});

module.exports = Expense;