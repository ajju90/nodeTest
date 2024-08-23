const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'database-1.c5gw0is62vmi.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: '123456789',
    database: 'testdb',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
