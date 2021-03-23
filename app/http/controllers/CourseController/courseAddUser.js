'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const User = require('../../../models/User');
const logln = require('../../../utils/logln');




/**
 * Update course : add user
 */

const courseAddUser = (req, res) => {

  Course.findByPk(req.params.id, {
    include: [{
      model: User,
      attributes: ['id'],
    }]
  }).then(course => {


    const currentAbility = ability(req.current_user);
    if ( currentAbility.cannot('organize', course)
        || currentAbility.cannot('subscribe', new User({id: req.params.userId})) ) {

      return res.status(403).json({
        message: 'Vous n’avez pas l’autorisation',
        status: 403
      });
    }


    if (course.users.length >= course.capacity) {

      return res.status(304).json({
        message: "Le cours est au complet",
        status: 304
      });
    }


    if (course.users.length > 0) {

      let userExists = course.users.filter(user => user.dataValues.id == req.params.userId);

      if (userExists.length > 0) {

        return res.status(304).json({
          message: "L'élève est déjà inscrit.",
          status: 304
        });
      }
    }


    User.findByPk(req.params.userId).then(user => {

      course.addUser(user);

      res.status(201).json({ message: "L'élève est bien inscrit." });

    }).catch((error) => {

      return res.status(500).json({
        message: 'Erreur serveur.',
        status: 500
      });
    });


  }).catch((error) => {

    return res.status(500).json({
      message: 'Erreur serveur.',
      status: 500
    });
  });
}



module.exports = courseAddUser;

