'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const Teacher = require('../../../models/Teacher');
const User = require('../../../models/User');
const logln = require('../../../utils/logln');





/**
 * Update course
 */

const updateCourse = (req, res) => {

  const putCourse = req.body;
  putCourse.id = req.params.id;

  Course.findByPk(putCourse.id)
    .then(course => {

      const currentAbility = ability(req.current_user);
      if (currentAbility.cannot('update', course)) {

        return res.status(403).json({
          message: 'Vous n’avez pas l’autorisation',
          status: 403
        });
      }

      course.update(putCourse).then(course => {

        Course.findByPk(course.dataValues.id, {

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

            return respUser;
          })
      
          respCourse.participants = respUsers;
          delete respCourse.users;
      
          respCourse.teacher = respTeacher;
      
          res.status(200).json(respCourse)
          
        }).catch((error) => {

          res.status(400).json({
            message: 'Requête erronée',
            status: 400
          });
        });



      }).catch((error) => {

        res.status(500).json({
          message: 'Erreur serveur (find)',
          status: 500
        });
      });



    }).catch((error) => {

      res.status(500).json({
        message: 'Erreur serveur (find)',
        status: 500
      });
    });
}



module.exports = updateCourse;

