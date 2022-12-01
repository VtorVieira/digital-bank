require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'bd_digital',
    host: process.env.MYSQL_HOST || 'db',
    port: process.env.MYSQL_PORT || '4306',
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'bd_digital',
    host: process.env.MYSQL_HOST || 'db',
    port: process.env.MYSQL_PORT || '4306',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'bd_digital',
    host: process.env.MYSQL_HOST || 'db',
    port: process.env.MYSQL_PORT || '4306',
    dialect: 'mysql',
  },
};
