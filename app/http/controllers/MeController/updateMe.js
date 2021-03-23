'use strict';
const { Op } = require('sequelize');
const dbEnums= require('../../../../config/constants');
const User = require('../../../models/User');
const Teacher = require('../../../models/Teacher');
const image = require('../../../services/image');
const logln = require('../../../utils/logln');




/**
 * Update self
 */
const updateMe = (req, res, next) => {

  if (!req.current_user.id) {
    return res.status(401).json({
      message: 'Veuillez vous connecter',
      status: 402
    })
  }
  
  // let putUser = (req.body);
  let putUser = JSON.parse(req.body.user);

  if ( putUser.email) {
    var or = [{ id: req.current_user.id }, { email: putUser.email }]
  }
  else  var or = [{ id: req.current_user.id }, { email: 'noemail' }];
     
  delete putUser.id;
  delete putUser.role;


  User.findAll({

    where: { [Op.or]: or },
    
    include: [{
      model: Teacher
    }]
    
  }).then(user => {
    
res.json(user)
    if (user.length > 1) {

      return res.status(400).json({
        message: 'Cette adresse email est déjà utilisée',
        status: 400
      });
    }

    else {


      user = user[0];

      ////CHECK FOR NEW AVATAR
      if (!!req.file) {

        putUser.avatarUrl = image.processAvatar(user.id, req.file);
      }

      
      //CHECK IF USER IS TEACHER
      if (user.role === dbEnums.ROLE_TEACHER) {

        let putTeacher = {

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

          User.update(putUser,

            { returning: true, where: { id: user.id } }
  
          ).then(user => {

            let respUser = user.dataValues;
            respUser.teacher = teacher.dataValues;

            res.status(200).json(respUser);

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
      


      //IF USER IS STUDENT
      else User.update(putUser,

        { returning: true, where: { id: user.id } }

      ).then(user => {

        let respUser = user.dataValues;
        respUser.teacher = putTeacher;

        res.status(200).json(respUser);
        //update
      }).catch(error => {

        res.status(500).json({
          message: 'erreur serveur (update)',
          status: 500
        });
      });

    }

    //find user
  }).catch((error) => {

    res.status(500).json({
      message: 'Erreur serveur (find)',
      status: 500
    });
  });
}

module.exports = updateMe;
