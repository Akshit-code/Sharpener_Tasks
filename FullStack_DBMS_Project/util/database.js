const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'database_management_project',
    'root',
    'Hidden Password',
    {
        host:'localhost',
        dialect:'mysql',
    }
);

module.exports = sequelize;