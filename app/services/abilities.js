'use strict';
const Ability = require('@casl/ability').Ability;
const AbilityBuilder = require('@casl/ability').AbilityBuilder;

// Constants
const constants = require('../../config/constants');

//debug
const logln = require('../utils/logln')




const getVisitorRules = () => {

  const { rules, can } = AbilityBuilder.extract();

  can('create', 'User');

  return rules;
}



const getStudentRules = (user) => {

  const { rules, can, cannot } = AbilityBuilder.extract();

  cannot('read', 'users');
  can( ['read', 'update'], 'User', {id: user.id } );
  can(['subscribe', 'unsubscribe'], 'User', {id: user.id});
  
  return rules;
}



const getTeacherRules = (user) => {
  
  const { rules, can } = AbilityBuilder.extract();

  can('read', 'users');
  can('read', 'User');
  can( 'update', 'User', {id: user.id } );
  can(['subscribe', 'unsubscribe'], 'User', {id: user.id});
  can( 'update', 'Teacher', {id: user.teacherId } );
  can( 'create', 'Course');
  can( ['update', 'delete', 'organize'], 'Course', {teacherId: user.teacherId } );

  return rules;
}



const getAdminRules = () => {

  const { rules, can } = AbilityBuilder.extract();
  
  can( 'manage', 'all');

  return rules;
}



const getRules = (user) => {

  switch(user.role) {

    case constants.ROLE_STUDENT:
      return getStudentRules(user);

    case constants.ROLE_TEACHER:
      return getTeacherRules(user);

    case constants.ROLE_ADMIN:
      return getAdminRules();

    default:
      return getVisitorRules();
  }
}



//Retrieve model name if necessary from structure of sequelize object models

const subjectName = (subject)=> {

  if (typeof subject === 'object') {

    let subjectName = subject._modelOptions.name.singular;
    subjectName = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

    return subjectName;
  }

  else return subject;
}



const ability = (user) => {

  return new Ability( getRules(user), {subjectName}  );
}



exports.ability = ability;
exports.getRules = getRules;
