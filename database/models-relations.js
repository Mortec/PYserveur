'use strict';
// Models
const User = require('../app/models/User');
const Teacher = require('../app/models/Teacher');
const Course = require('../app/models/Course');
const CourseUser = require('../app/models/Course-User');

const doModelsRelations = () => {

  /**
   *  User <-> Teacher
   */
  User.hasOne(Teacher);
  Teacher.belongsTo(User);

  /**
   * Course <-> Teacher  
   */
  Teacher.hasMany(Course);
  Course.belongsTo(Teacher);

  /**
   * Course <-> User
   */
  User.belongsToMany(Course, { through: CourseUser } );
  Course.belongsToMany(User, { through: CourseUser } );
}

module.exports = doModelsRelations;
