'use strict';
const __rootDir = require('../../../utils/rootDir');
const ability = require(__rootDir+'/app/services/abilities').ability;
const User = require(__rootDir+'/app/models/User');
const Teacher = require(__rootDir+'/app/models/Teacher');
const Course = require(__rootDir+'/app/models/Course');
const logln = require(__rootDir+'/app/utils/logln')



/**
 * Show one user
 */

const getUser = (req, res) => {

  const currentAbility = ability(req.current_user);
  if ( currentAbility.cannot('read', new User({id : parseInt(req.params.id)}) ) ) {
    
    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    })
  }


  User.findByPk(req.params.id, {

    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl',
      'healingConditions', 'medicalCertificateUrl', 'status', 'role'],

    include: [

      {
        model: Teacher,
        attributes: ['id', 'bio', 'website', 'facebook', 'twitter', 'instagram', 'prices', 'show']
      },

      {
        model: Course,
        attributes: ['id', 'capacity', 'cost', 'duration',
          'level', 'teacherId', 'title', 'place', 'startTime', 'description'],

        include: [{
          model: Teacher,
          attributes: ['id', 'bio', 'website', 'facebook', 'twitter', 'instagram', 'prices', 'show'],

          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role',
              'avatarUrl', 'healingConditions', 'medicalCertificateUrl', 'status']
          }]
        }]
      }
    ]
  }).then( user => {

    if (!user) {

      return res.status(204).json({ message: 'Pas de resultats pour cette requête','status': 204});
    }

    let respUser = user.get({ plain: true });

    if (respUser.teacher) {
      respUser.teacherId = respUser.teacher.id;
      delete respUser.teacher.id;
      respUser = { ...respUser, ...respUser.teacher };
    }
    delete respUser.teacher;

    let userCourses = respUser.courses.map(course => {

      course.teacher.userId = course.teacher.user.id;
      course.teacher = { ...course.teacher, ...course.teacher.user };
      delete course.teacher.user;
      delete course.courseUser;

      return course;
    })

    respUser.courses = userCourses;

    res.status(200).json(respUser);

  }).catch((error) => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400
    });
  });
}



module.exports = getUser;
