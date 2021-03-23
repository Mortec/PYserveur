'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const Teacher = require('../../../models/Teacher');
const User = require('../../../models/User');
const logln = require('../../../utils/logln')



/**
 * Show all teachers
 */
const getTeachers = (req, res) => {


  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  if (limit > 25 || !limit) limit = 25;
  if ( !page )  page = 1;


  Teacher.findAndCountAll(
    {
      where: { show: true },
      distinct: true,
      offset:  (page-1)*limit,
      limit: limit,
      
      attributes: ['id', 'bio', 'website', 'facebook', 'twitter', 'instagram', 'prices', 'userId'],

      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl']
        },
        {
          model: Course,
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'phone', 'email'],
            include: [{
              model: Teacher,
              attributes: ['id', 'bio', 'website', 'facebook', 'instagram', 'twitter', 'prices']
            }],
          }],
          attributes: ['id', 'title', 'level', 'description', 'place',
            'pictureUrl', 'startTime', 'duration', 'cost', 'capacity', 'teacherId'
          ],
        }
      ]
    }
  ).then(teachers => {

    if (!teachers.rows.length){
      
      return res.status(204).json({ message: 'Pas de resultats pour cette requête', status: 204 });
    }


    const respTeachers = teachers.rows.map(teacher => {

      let respTeacher = teacher.dataValues;
      let respUser = respTeacher.user.dataValues;
      respTeacher.userId = respUser.id;
      delete respUser.id;
      respTeacher = {...respTeacher, ...respUser};
      delete respTeacher.user;

      let respCourses = respTeacher.courses.map( course => {

        let respCourse = course.dataValues;

        let respCourseUsers = respCourse.users.map(user => {

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

        respCourse.participants = respCourseUsers;
        delete respCourse.users;

        return respCourse;
      });

      respTeacher.courses = respCourses;

      return respTeacher;
    });

    let previous = '/teachers/?limit=' + limit + '&page=' + (page - 1);
    let next = '/teachers/?limit=' + limit + '&page=' + (page + 1);
    previous = (page > 1) ? previous : null;
    next = (page < teachers.count / limit) ? null : next;

    const response = {
      results: respTeachers,
      count: teachers.count,
      previous: previous,
      next: next
    };

    res.status(200).json(response);
  }).catch((error) => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400
    });
  });
}


module.exports = getTeachers;

