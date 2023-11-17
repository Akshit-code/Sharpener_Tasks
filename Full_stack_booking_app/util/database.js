// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "book_your_slot",
//     password: "Hidden Password"
// });

// module.exports = pool.promise();

const {Sequelize} = require('sequelize');
const sequelize =  new Sequelize('book_your_slot', 'root', 'Random Password', 
    {
        host:'localhost',
        dialect:'mysql',
    });

module.exports = sequelize;