'use strict';
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../../../models/User');
const token = require('../../../services/token');
const rules = require('../../../services/authorize').rules;
const logln = require('../../../utils/logln');



const login = (req, res, next) => {


  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {

      bcrypt.compare(req.body.password, user.password).then(result => {

        if (result) {

          // Token payload
          const payload = {
            id: user.id,
            rules: rules(user)
          };

          // Send the token in a duo of authentication cookies
          token.refresh(res, payload);

          const safeUser = _.omit(user.dataValues, [
            'createdAt',
            'updatedAt',
            'password',
          ]);

          // 202 Accepted
          res.status(202).json(safeUser);

        } else {

          // 400 Bad Request bad passsword
          res.status(400).json({
            message: 'Veuillez vérifier vos identifiants',
            status: 400
          })
        }

      })
        // If bcrypt fail
        // 500 server error
        .catch((error) => res.status(500).json({
          message: 'Erreur serveur b',
          status: 500
          })
        )
    })
    // If user not in the database
    .catch((error) => {
      // 400 Bad Request
      res.status(400).json({
        message: 'Veuillez vérifier vos identifiants :)',
        status: 400
      })
    })
}


module.exports = login;
