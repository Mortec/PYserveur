'use strict';
const Sequelize = require('sequelize');

// Database
const db = require('../../database/database.js');

const CourseUSer = db.define('courseUser', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

});

module.exports = CourseUSer;
