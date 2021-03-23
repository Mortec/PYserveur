'use strict';
// Models
const User = require('../../models/User');


exports.checkEmail = (req, res, next) => {

  User.findOne({
    where: { email:req.body.email }
  }).then(user => {

    if (user) {

      return res.status(400).json({ message: "Cet adresse email est déjà utlilisée." })
    }
    else {

      return res.status(200).json({ message: "Adresse email OK." })
    }
  }).catch(error => {

    return res.status(500).json({ message: "erreur serveur (check email)", error: error })
  })
}

