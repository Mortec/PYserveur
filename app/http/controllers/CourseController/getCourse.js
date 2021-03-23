'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const Teacher = require('../../../models/Teacher');
const User = require('../../../models/User');
const logln = require('../../../utils/logln');




const getCourse = (req, res) => {



  Course.findByPk(req.params.id, {

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
  }).then(course => {

    if (!course) return res.status(204).json({
      message: 'Pas de resultats pour cette requête',
      status: 204
    });


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
      if (currentAbility.cannot('organize', course)) respUser = respUser.id;

      return respUser;
    })

    respCourse.participants = respUsers;
    delete respCourse.users;

    respCourse.teacher = respTeacher;


    res.status(200).json(respCourse)

  }).catch((error) => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400 });
  });
}


module.exports = getCourse;

