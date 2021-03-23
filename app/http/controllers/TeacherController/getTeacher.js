'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const Teacher = require('../../../models/Teacher');
const User = require('../../../models/User');
const logln = require('../../../utils/logln')



/**
 * Show one teacher
 */
const getTeacher = (req, res) => {

  Teacher.findByPk(req.params.id,
    {
      attributes: ['id', 'bio', 'website', 'facebook', 'twitter', 'instagram', 'prices', 'userId'],

      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl']
        },
        {
          model: Course,
          attributes: ['id', 'title', 'level', 'description', 'place',
            'pictureUrl', 'startTime', 'duration', 'cost', 'capacity', 'teacherId'
          ],

          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'phone', 'email'],
            include: [{
              model: Teacher,
              attributes: ['id', 'bio', 'website', 'facebook', 'instagram', 'twitter', 'prices']
            }],
          },],
        }
      ]
    }
  ).then(teacher => {

    let respTeacher = teacher.dataValues;
    let respUser = respTeacher.user.dataValues;
    respTeacher.userId = respUser.id;
    delete respUser.id;
    respTeacher = { ...respTeacher, ...respUser };
    delete respTeacher.user;

    let respCourses = respTeacher.courses.map(course => {

      let respCourse = course.dataValues;

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
        if (currentAbility.cannot('organize', course)) respUser = respUser.id;

        return respUser;
      })

      respCourse.participants = respUsers;
      delete respCourse.users;

      return respCourse;
    });


    respTeacher.courses = respCourses;

    res.status(200).json(respTeacher);

  }).catch((error) => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400
    });
  });
}


module.exports = getTeacher;
