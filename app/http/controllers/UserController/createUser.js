'use strict';
const __rootDir = require('../../../utils/rootDir');
const bcrypt = require('bcryptjs');
const ability = require(__rootDir+'/app/services/abilities').ability;
const User = require(__rootDir+'/app/models/User');
const logln = require(__rootDir+'/app/utils/logln')



/**
 * Create a user
 */

const createUser = (req, res) => {

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('create', 'User')){ 

    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    })
  }


  const newUser = req.body;

  User.findOne({ where: { email: newUser.email } })
    .then(user => {

      if (user) {

        return res.status(400).json({
          message: 'Cette adresse email est déjà utilisé par un utilisateur',
          error: 'User already exists', status: 400 
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

          User.create(newUser).then(createdUser => {

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


module.exports = createUser;
