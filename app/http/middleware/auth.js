'use strict';
const token = require('../../services/token');
const User = require('../../models/User');
const Teacher = require('../../models/Teacher');
const rules = require('../../services/authorize').rules;
const logln = require('../../utils/logln');




module.exports = (req, res, next) => {

  const { se, jp } = req.cookies;

  // If there is a `token` cookie and it is not a preflight
  if (se && jp && req.method !== "OPTIONS") {

    token.decode(req.cookies).then(decoded => {

      if (decoded) {

        const payload = { id: decoded.id, rules: decoded.rules };

        token.refresh(res, payload);

        User.findByPk( payload.id ,{

          include:[{
            model: Teacher,
            attributes: ['id', 'bio', 'website', 'facebook', 'twitter', 'instagram', 'prices', 'show']
          }],
      
          attributes: [ 'id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl', 'healingConditions', 'medicalCertificateUrl', 'status', 'role']
      
        }).then(user => {
      
          
          let respUser = user.dataValues;
          respUser.rules = rules(user);
      
          if( user.teacher ) {
          let teacher = user.teacher.dataValues;
          respUser.teacherId = teacher.id
          delete teacher.id
          respUser = { ...respUser, ...teacher };
          }
      
          delete respUser.teacher;
      
          req.current_user = respUser;

          next();
      
        }).catch((error) => {
      
          res.status(400).json({ message: 'Cet utilisateur n‘éxiste pas.', status: 400 });
        });
        

      }
      else {

        req.current_user = { role: 'v' };
        token.delete(res);
        next();
      }
    });
  }

  else {

    req.current_user = { role: 'v' };
    next();
  }
}
