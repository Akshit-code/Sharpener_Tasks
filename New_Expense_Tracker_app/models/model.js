const sequelize = require('../util/database');
const {DataTypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();

const User = async (userDetails)=> {
    const user = sequelize.define(userDetails, {
        id: {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                isEmail:true
            },
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
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        }
    })
}

module.exports = User;