'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const Teacher = require('../../../models/Teacher');
const User = require('../../../models/User');
const logln = require('../../../utils/logln');




/**
 * Store a course
 */

const createCourse = (req, res) => {

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('create', 'Course')){

    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    });
  }

  const newCourse = req.body;

  Course.create(newCourse).then(course => {

    Course.findByPk(course.dataValues.id, {
      include: [{
        model: Teacher,
        where: { id: db.Sequelize.col('course.teacherId') },
        attributes: ['id'],
        include: [{
          model: User,
          where: { id: db.Sequelize.col('teacher.userId') },
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl']
        }],
      }],
      // attributes: ['id', 'description', 'title', 'level', 'startTime', 'duration', 'cost', 'capacity', 'teacherId]
    }).then(course => {

      const respCourse = course.dataValues;
      respCourse.teacher = course.dataValues.teacher.dataValues.user.dataValues;
      respCourse.participants = [];

      res.status(201).json(respCourse);

    }).catch((error) => {

      res.status(400).json({
        message: 'Requête erronée',
        status: 400 });
    });
  }
  ).catch((error) => {

    res.status(500).json({
      message: 'Erreur serveur.',
      status: 500
    });
  });
}



module.exports = createCourse;

