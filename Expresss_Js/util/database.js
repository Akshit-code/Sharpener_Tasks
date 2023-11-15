const mysql = require('mysql');
const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: "node-complete",
    password: ''
});

module.exports = pool.promise();