'use strict';
const __rootDir = require('../../../utils/rootDir');
const ability = require(__rootDir+'/app/services/abilities').ability;
const User = require(__rootDir+'/app/models/User');
const Teacher = require(__rootDir+'/app/models/Teacher');
const Course = require(__rootDir+'/app/models/Course');
const logln = require(__rootDir+'/app/utils/logln')



/**
 * Show all the users
 */

const getUsers = (req, res) => {

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('read', 'users')){

    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    })
  }


  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  if (limit > 25 || !limit) limit = 25;
  if (!page) page = 1;

  User.findAndCountAll({

    distinct: true,
    limit: limit,
    offset: limit * (page - 1),

    attributes: [
      'id', 'firstName', 'lastName', 'email', 'phone', 'role',
      'avatarUrl', 'healingConditions', 'medicalCertificateUrl', 'status'
    ],

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
  }).then(users => {


    if (!users.rows.length) {

      return res.status(204).json({message: 'Pas de resultats pour cette requête', 'status': 204});
    }

   
    let respUsers = users.rows.map( seqUser => {

      let user = seqUser.get({ plain: true });

      if (user.teacher) {
        user.teacherId = user.teacher.id;
        user = { ...user, ...user.teacher };
      }
      delete user.teacher;

      let userCourses = user.courses.map(course => {

        course.teacher.userId = course.teacher.user.id;
        course.teacher = { ...course.teacher, ...course.teacher.user };
        delete course.teacher.user;
        delete course.courseUser;

        return course;
      })

      user.courses = userCourses;

      return user;
    })

    let previous = '/users/?limit=' + limit + '&page=' + (page - 1);
    let next = '/users/?limit=' + limit + '&page=' + (page + 1);
    previous = (page > 1) ? previous : null;
    next = (page < users.count / limit) ? next : null;

    let response = {
      results: respUsers,
      count: users.count,
      previous: previous,
      next: next
    };

    res.status(200).json(response);

  }).catch((error) => {

    res.status(500).json({
      message: 'Erreur serveur',
      status: 500
    });
  });
}


module.exports = getUsers;
