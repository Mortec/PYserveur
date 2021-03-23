'use strict';
const moment = require('moment');
const { Op } = require('sequelize');
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const Teacher = require('../../../models/Teacher');
const User = require('../../../models/User');
const logln = require('../../../utils/logln')



/**
 * Show courses per teacher
 */
const getTeacherCourses = (req, res) => {


  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  if (limit > 25 || !limit) limit = 25;
  if (!page) page = 1;

  Course.findAndCountAll({

    where: { teacherId: req.params.id, startTime: { [Op.gte]: moment().toDate() } },
    
    distinct: true,
    offset: (page - 1) * limit,
    limit: limit,
    order: [['startTime', 'ASC']],
    
    attributes: ['id', 'title', 'level', 'description', 'place',
      'pictureUrl', 'startTime', 'duration', 'cost', 'capacity', 'teacherId'
    ],

    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'phone', 'email'],
        include: [{
          model: Teacher,
          attributes: ['id', 'bio', 'website', 'facebook', 'instagram', 'twitter', 'prices']
        }],
      },
      {
        model: Teacher,
        attributes: ['id', 'bio', 'website', 'facebook', 'instagram', 'twitter', 'prices'],
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'phone', 'email']
        }],

      }
    ]
  }).then(courses => {

    if (!courses.rows.length){
      
      return res.status(204).json({
        message: 'Pas de resultats pour cette requête',
        status: 204
      });
    }


    const respCourses = courses.rows.map(course => {

      let respCourse = course.dataValues;
      let respTeacher = respCourse.teacher.dataValues;
      let respUser = respTeacher.user.dataValues;

      respTeacher.userId = respUser.id;
      delete respUser.id;
      respTeacher = { ...respTeacher, ...respUser };
      delete respTeacher.user;

      const respUsers = course.users.map(user => {

        let respUser = user.dataValues;

        if (user.teacher) {
          let teacher = user.teacher.dataValues;
          respUser.teacherId = teacher.id
          delete teacher.id
          respUser = { ...respUser, ...teacher };
        }

        delete respUser.teacher;
        delete respUser.courseUser;

        const currentAbility = ability(req.current_user);
        if ( currentAbility.cannot('organize', course) ) respUser = respUser.id;

        return respUser;
      })


      respCourse.participants = respUsers;
      delete respCourse.users;
      respCourse.teacher = respTeacher;

      return respCourse;
    });

    let previous = '/courses/?limit=' + limit + '&page=' + (page - 1);
    let next = '/courses/?limit=' + limit + '&page=' + (page + 1);
    previous = (page > 1) ? previous : null;
    next = (page < courses.count / limit) ? next : null

    const response = {
      results: respCourses,
      count: courses.count,
      previous: previous,
      next: next
    };

    res.status(200).json(response)

  }).catch((error) => {

    res.status(400).json({
      message: 'Requête erronée',
       status: 400
      });
  });
}


module.exports = getTeacherCourses;

