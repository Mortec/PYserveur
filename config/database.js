'use strict';
const fs = require('fs');

//CLI config for executing migration to the database
//npx sequelize-cli db:migrate:undo

module.exports = {
  development: {
    "username": "yogaserver",
    "password": "yoga",
    "database": "yoga_dev",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3306"
  },
  production: {
    username: process.env.yoga_db_username,
    password: process.env.yoga_db_password,
    database: process.env.yoga_db_database,
    host: process.env.yoga_db_host,
    dialect: 'mysql',
  }
};
