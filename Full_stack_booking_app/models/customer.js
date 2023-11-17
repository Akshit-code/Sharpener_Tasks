const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');

const Customer = sequelize.define('customer', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },  
});

module.exports = Customer;
