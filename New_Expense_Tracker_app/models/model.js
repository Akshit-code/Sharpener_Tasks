const sequelize = require('../util/database');
const {DataTypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();

const User = sequelize.define('User', {
    id: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: {
            isEmail:true
        },
        primaryKey:true
    },
    firstName: {
        type:DataTypes. STRING,
        allowNull:false
    },
    lastName: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

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
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail:true
        }
    },
});

module.exports = {User, Expense};