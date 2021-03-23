'use strict';
const __rootDir = require('../../../utils/rootDir');
const ability = require(__rootDir+'/app/services/abilities').ability;
const User = require(__rootDir+'/app/models/User');
const Teacher = require(__rootDir+'/app/models/Teacher');
const Course = require(__rootDir+'/app/models/Course');
const logln = require(__rootDir+'/app/utils/logln')




/**
 * Show courses per user id
 */

const getUserCourses = (req, res) => {

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('read', new User( {id: parseInt(req.params.id)} ))){

    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    })
  }


  User.findByPk(req.params.id,
    {
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl'],

      include: [{
        model: Course,
        include: [{
          model: Teacher,
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl']
          }]
        }],
        attributes: ['id', 'description', 'title', 'level', 'startTime', 'duration', 'cost', 'capacity', 'teacherId'],
      }],
    }
  ).then( seqUser => {

    if (!seqUser) {

      return res.status(204).json({ message: 'Pas de resultats pour cette requête', 'status': 204 });
    }

    let user = seqUser.get({ plain: true });

    let userCourses = user.courses.map(course => {

      course.teacher.userId = course.teacher.user.id;
      course.teacher = { ...course.teacher, ...course.teacher.user };
      delete course.teacher.user;
      delete course.courseUser;

      return course;
    })

    res.status(200).json(userCourses);

  }).catch((error) => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400
    });
  });
}



module.exports = getUserCourses;
