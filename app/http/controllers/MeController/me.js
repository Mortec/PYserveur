'use strict';
const User = require('../../../models/User');
const Teacher = require('../../../models/Teacher');
const rules = require('../../../services/authorize').rules;
const logln = require('../../../utils/logln')




const me = (req, res) => {

  if (!req.current_user.id){
    
    return res.status(401).json({
      message: 'Veuillez vous connecter',
      status: 401
    });
  }


  User.findByPk(req.current_user.id,{

    include:[{
      model: Teacher,
      attributes: ['id', 'bio', 'website', 'facebook', 'twitter', 'instagram', 'prices', 'show']
    }],

    attributes: [ 'id', 'firstName', 'lastName', 'email', 'phone', 'avatarUrl',
    'healingConditions', 'medicalCertificateUrl', 'status', 'role']

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

    res.status(200).json( respUser );

  }).catch((error) => {

    res.status(400).json({
      message: 'Cet utilisateur n‘éxiste pas.',
      status: 400
    });
  });

}



module.exports = me;
