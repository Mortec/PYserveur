'use strict';
const bcrypt = require('bcryptjs');
const _ = require('lodash');

// Models
const User = require('../../../models/User');




const register = (req, res, next) => {

  const newUser = req.body;

  User.findOne({ where: { email: newUser.email } })
    .then(user => {

      if (user) {

        return res.status(400).json({
          message: 'Cette adresse email est déjà utilisé par un utilisateur',
          status: 400
        });
      }

      else {

        const saltRound = 12;

        bcrypt.hash(newUser.password, saltRound, (error, hash) => {


          if (error) return res.status(500).json({
            message: 'Erreur serveur',
            status: 500
          });

          newUser.password = hash;

          User.create(newUser)
            .then(createdUser => {


              const respUser = _.omit(createdUser.dataValues, ['password']);

              res.status(201).json(respUser);
            })
            .catch((error) => {

              res.status(500).json({
                message: 'Erreur serveur.',
                status: 500
              });
            });
        });
      }

    }).catch((error) => {

      res.status(400).json({
        message: 'Erreur serveur',
        status: 500
      });
    });
}



module.exports = register;
