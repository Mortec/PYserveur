'use strict';
const { Op } = require('sequelize');
const __rootDir = require('../../../utils/rootDir');
const ability = require(__rootDir + '/app/services/abilities').ability;
const User = require(__rootDir + '/app/models/User');
const Teacher = require(__rootDir + '/app/models/Teacher');
const image = require(__rootDir + '/app/services/image');
const dbEnums = require(__rootDir + '/config/constants');
const logln = require(__rootDir + '/app/utils/logln')




/**
 * Update user
 */

const updatetUser = (req, res) => {

  if (req.current_user.role != dbEnums.ROLE_ADMIN) delete req.body.role;

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('update', new User({ id: parseInt(req.params.id) }))) {
    
    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    })
  }

  //  let putUser = (req.body);
  let putUser = JSON.parse(req.body.user);

  if ( putUser.email) {
    var or = [{ id: req.params.id }, { email: putUser.email }]
  }
  else  var or = [{ id: req.params.id }, { email: 'noemail' }];

  delete putUser.id;


  User.findAll({
    where: { [Op.or]: or },

    include: [{
      model: Teacher
    }]

  }).then(user => {

    if (user.length > 2) {


      return req.status(400).json({
        message: 'Cet adresse email est déjà utilisée',
        status: 400
      });
    }

    else {


      user = user[0];

      ////CHECK FOR NEW AVATAR
      if (!!req.file) {

        putUser.avatarUrl = image.processAvatar(user.id, req.file);
      }

      //CHECK IF USER IS ALREADY TEACHER
      if (user.role === dbEnums.ROLE_TEACHER) {

        let putTeacher = {

          show: putUser.show,
          bio: putUser.bio,
          facebook: putUser.facebook,
          instagram: putUser.instagram,
          prices: putUser.prices,
          twitter: putUser.twitter,
          website: putUser.website
        }

        Teacher.update(putTeacher,

          { returning: true, where: { id: user.teacher.dataValues.id } }
        ).then(teacher => {

          user.update(putUser).then(user => {

            let respUser = user.dataValues;
            respUser.teacher = teacher.dataValues;

            res.status(200).json(respUser);
            //update
          }).catch(error => {

            res.status(500).json({
              message: 'erreur serveur (update u)',
              status: 500
            });
          });

        }).catch((error) => {

          return res.status(500).json({
            message: 'erreur serveur (update t)',
            status: 500
          });
        });
      }



      //CHECK IF USER BECOMES TEACHER
      else if (user.role === dbEnums.ROLE_STUDENT && putUser.role === dbEnums.ROLE_TEACHER) {

        let putTeacher = {

          show: putUser.show,
          bio: putUser.bio,
          facebook: putUser.facebook,
          instagram: putUser.instagram,
          prices: putUser.prices,
          twitter: putUser.twitter,
          website: putUser.website
        }

        user.createTeacher(putTeacher).then(teacher => {

          user.update(putUser).then(user => {

            let respUser = user.dataValues;
            respUser.teacher = teacher.datavalues;

            res.status(200).json(respUser);
            //update
          }).catch(error => {

            return res.status(500).json({
              message: 'erreur serveur (update u create t)',
              status: 500
            });
          });

        }).catch((error) => {

          return errorres.status(500).json({
            message: 'erreur serveur (create t)',
            status: 500
          });
        });
      }



      //IF USER IS STUDENT
      else user.update(putUser).then(user => {

        let respUser = user.dataValues;
        respUser.teacher = putTeacher;

        res.status(200).json(respUser);

      }).catch(error => {

        res.status(500).json({
          message: 'erreur serveur (update)',
          status: 500
        });
      });

    }

    //find by pk
  }).catch((error) => {

    res.status(500).json({
      message: 'Erreur serveur (find)',
      status: 500
    });
  });
}


module.exports = updatetUser;
