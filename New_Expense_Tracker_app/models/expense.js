const sequelize = require('../util/database');
const {DataTypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();

const Expense = sequelize.define('expenses', {
    amount: {
        type: DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false
    }, 
    desc: {
        type: DataTypes.STRING,  
        allowNull:false
    },
    category: {
        type: DataTypes.ENUM('Food', 'Rent', 'Travel', 'Bills'),
        allowNull: false
    },
    totalExpense: {
        type:DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false
    }
});

Expense.beforeCreate(async (expense, options) => {
    try {
        const totalExpenses = await Expense.sum('amount', { where: { UserId:expense.UserId }, raw: true });
        expense.totalExpense = Number(totalExpenses || 0) + Number(expense.amount || 0);
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = Expense;