const mysql = require('mysql2');
require('dotenv').config();

// First create a connection without database selection
const initialConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Create database if it doesn't exist (though it should exist in cPanel)
initialConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }
  console.log('Database checked/created');
  initialConnection.end();
});

// Now create the pool with the database selected
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).on('error', (err) => {
  console.error('Database pool error:', err);
});

// Convert pool to use promises
const promisePool = pool.promise();

// Add a test query to verify connection
const testConnection = async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log('Database connection verified');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

testConnection();

module.exports = promisePool; 