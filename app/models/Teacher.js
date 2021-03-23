'use strict';
const Sequelize =  require('sequelize');

// Database
const db = require('../../database/database.js');

const Teacher = db.define('teacher', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  bio: {
    type: Sequelize.TEXT,
  },

  website: {
    type: Sequelize.STRING,
  },

  facebook: {
    type: Sequelize.STRING,
  },

  twitter: {
    type: Sequelize.STRING,
  },

  instagram: {
    type: Sequelize.STRING
  },

  prices:{
    type: Sequelize.TEXT
  },

  show:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },

  slug:{
    type: Sequelize.STRING,
  },

});

module.exports = Teacher;
