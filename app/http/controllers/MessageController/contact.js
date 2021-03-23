'use strict';
const ability = require('../../../services/abilities').ability;
const User = require('../../../models/User');
const dbEnums = require('../../../../config/constants');
const logln = require('../../../utils/logln')
const email = require('../../../services/email');


const contact = (req, res, next) => {


  User.findOne({

    where: { role: dbEnums.ROLE_ADMIN },
    atribute: ['firstName', 'lastName', 'email']

  }).then(admin => {

    const message = {

      from: {
        email: req.body.email,
        name: req.body.firstName + ' ' + req.body.lastName
      },
      subject: 'Le Palais du Yoga',
      text: req.body.message,
      to: {
        email: admin.email,
        name: admin.firstName + ' ' + admin.lastName
      }

    }

    email.send(message).then( success => {

        const answer = {
          from: {
            email: admin.email,
            name: 'Le Palais du Yoga'
          },
          subject: 'Le Palais du Yoga',
          text: 'Nous avons bien reçu votre message !',
          to: {
            email: req.body.email,
            name: req.body.firstName + ' ' + req.body.lastName
          },
        }

        email.send(answer).then( success => {

          res.status(200).json({ message: "Messages envoyés." });

        }).catch((error) => {

          logln(error, 'message error code response to user');
          res.status(400).json({ message: "Probleme d'envoi de message", error:error });
        })

        
    }).catch((error) => {

      logln(error, 'Erreur user message');
      res.status(400).json({ message: "Probleme d'envoi de message", error: error });
    })




    //find admin
  }).catch(error => {
    logln(error, 'error find')
    res.status(400).json({ message: "erreur find admin", error: error })
  })
}

module.exports = contact;

