'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const User = require('../../../models/User');
const logln = require('../../../utils/logln');




/**
 * Update course remove user
 */
const courseRemoveUser = (req, res) => {

  Course.findByPk(req.params.courseId, {

    include: [{ model: User }]

  }).then(course => {


    const currentAbility = ability(req.current_user);
    if ( currentAbility.cannot('organize', course)
        || currentAbility.cannot('subscribe', new User({id: req.params.userId})) ) {

      return res.status(403).json({
        message: 'Vous n’avez pas l’autorisation',
        status: 403
      });
    }


    if (course.users.length) {

      User.findByPk(req.params.userId).then(user => {

        course.removeUser(user);

        res.status(201).json({ message: "L'élève n'est plus inscrit.", status: 201 });

      }).catch((error) => {

        return res.status(500).json({
          message: 'Erreur serveur (user)',
          status: 500 });
      })
    }

    else return res.status(400).json({
      message: 'Le cours n‘a plus d‘élèves inscrits.',
      status: 400
    })

  }).catch((error) => {

    return res.status(500).json({
      message: 'Erreur serveur (course)',
      status: 500
    });
  });
}



module.exports = courseRemoveUser;

