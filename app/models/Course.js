'use strict';
const Sequelize = require('sequelize');

// Database
const db = require('../../database/database.js');

// Constants
const db_enums = require('../../config/constants');

const Course = db.define('course', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
  },

  pictureUrl: {
    type : Sequelize.STRING,
  },

  level: {
    type: Sequelize.ENUM,
    values: db_enums.COURSE_LEVEL_ENUM,
    allowNull: false,
    defaultValue: db_enums.COURSE_LEVEL_NEWBIE,
  },

  place: {
    type: Sequelize.STRING,
    allowNull: false
  },

  cost: {
    type: Sequelize.FLOAT,
  },

  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

});

module.exports = Course;
