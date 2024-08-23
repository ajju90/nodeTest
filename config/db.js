const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Avinash@83083',
    database: 'testdb',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
