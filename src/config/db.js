// // src/config/db.js
// const mysql = require('mysql2/promise');

// // const pool = mysql.createPool({
// //     host: process.env.DB_HOST,
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DB_NAME,
// //     port: process.env.DB_PORT,
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0
// // });
// const pool = mysql.createPool({
//     host: "root",
//     user: "localhost",
//     password: "1234",
//     database: "node-complete",
//     port: "3306",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });


// module.exports = pool;
// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful!');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}

testConnection();

module.exports = pool;
