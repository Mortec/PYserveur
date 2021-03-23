'use strict';
const Sequelize = require('sequelize');
const config = require('config');

const { database, username, password, host, dialect, port } = config.get('db');

const db = new Sequelize( database, username, password, {
  host,
  dialect,
  port,
});

module.exports = db;
