'use strict';
const Sequelize = require('sequelize');

// Database
const db = require('../../database/database.js');

// Constants
const db_enums = require('../../config/constants');

const User = db.define('user', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  phone: {
    type: Sequelize.STRING,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  avatarUrl: {
    type: Sequelize.STRING
  },

  healingConditions: {
    type: Sequelize.TEXT
  },

  medicalCertificateUrl: {
    type: Sequelize.STRING
  },

  status: {
    type: Sequelize.ENUM,
    values: db_enums.STATUS_ENUM,
    allowNull: false,
    defaultValue: db_enums.STATUS_PENDING
  },

  token: {
    type: Sequelize.STRING,
  },

  resetTokenExpiresAt: {
    type: Sequelize.DATE,
  },

  lastConnectedAt: {
    type: Sequelize.DATE,
  },

  role: {
    type: Sequelize.ENUM,
    values: db_enums.ROLE_ENUM,
    allowNull: false,
    defaultValue: db_enums.ROLE_STUDENT
  },

});

module.exports = User;
