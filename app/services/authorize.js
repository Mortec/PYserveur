'use strict';
const Ability = require('@casl/ability').Ability;

// Constants
const constants = require('../../config/constants');

const studentRules = [
  { subject: 'Users', actions: 'update' },
  { subject: 'Courses', actions: 'subscribe' },
  { subject: 'Courses', actions: 'unsubscribe' },
];

const teacherRules = [
  ...studentRules,
  { subject: 'Users', actions: 'read' },
  { subject: 'Admin', actions: 'read' },
  { subject: 'Teachers', actions: 'update' },
  { subject: 'Courses', actions: 'create' },
  { subject: 'Courses', actions: 'update' },
  { subject: 'Courses', actions: 'delete' },
];

const adminRules = [
  { subject: 'all', actions: 'manage' },
  { subject: 'Courses', actions: 'subscribe' },
  { subject: 'Courses', actions: 'unsubscribe' },
];

const getRules = (user) => {
  let rules = [];

  switch(user.role) {
    case constants.ROLE_STUDENT:
      rules = studentRules;
      break;
    case constants.ROLE_TEACHER:
      rules = teacherRules;
      break;
    case constants.ROLE_ADMIN:
      rules = adminRules;
      break;
    default:
      rules = [];
  }

  return rules;
}

exports.rules = getRules;

exports.ability = (user) => {
  const rules = getRules(user)

  return new Ability(rules);
}

exports.role = (user) => {
  let role = null;

  switch(user.role) {
    case constants.ROLE_STUDENT:
      role = 'student';
      break;
    case constants.ROLE_TEACHER:
      role = 'teacher';
      break;
    case constants.ROLE_ADMIN:
      role = 'admin';
      break;
    default:
      role = null;
  }

  return role;
}
