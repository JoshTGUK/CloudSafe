require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'allsafe_root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'allsafe_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'allsafe_root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'allsafe_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
