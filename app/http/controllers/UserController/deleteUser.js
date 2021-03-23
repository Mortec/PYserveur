'use strict';
const __rootDir = require('../../../utils/rootDir');
const ability = require(__rootDir+'/app/services/abilities').ability;
const User = require(__rootDir+'/app/models/User');
const Teacher = require(__rootDir+'/app/models/Teacher');
const logln = require(__rootDir+'/app/utils/logln')




/**
 * Delete user
 */

const deleteUser = (req) => {

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('delete', 'User')){

    return res.status(403).json({ message: 'Vous n’avez pas l’autorisation', status: 403 })
  }


  User.findByPk(req.params.id, {

    include:  {model: Teacher }
    
    }).then( (user)=>{

      if ( user.teacher) {

        Teacher.destroy({where: {id: user.teacher.id}}).then( ()=>{

          User.destroy({where: {id: user.id}}).then(()=>{

            res.status(204).json({message: 'Profil effacé', status: 204 });

          }).catch((error) => {

            res.status(500).json({
              message: 'Erreur serveur (destroy)',
              status: 500
            })
          });
        }).catch((error) => {

          res.status(500).json({
            message: 'Erreur serveur (destroy)',
            status: 500
          })
        });
      }

      else {

        User.destroy({where: {id: user.id}}).then(()=>{

          res.status(204).json({message: 'Profil effacé', status: 204 });

        }).catch((error) => {

          res.status(500).json({
            message: 'Erreur serveur (destroy)',
            status: 500
          })
        });
      }
    }).catch((error) => {

      res.status(500).json({
        message: 'Erreur serveur (destroy)',
        status: 500
      })
    });
}

module.exports = deleteUser;
