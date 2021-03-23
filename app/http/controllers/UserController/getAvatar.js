'use strict';
const __rootDir = require('../../../utils/rootDir');
const fs = require('fs');
const path = require('path');
const ability = require(__rootDir + '/app/services/abilities').ability;
const logln = require(__rootDir + '/app/utils/logln');



/**
 * get avatar picture
 */


const getAvatar = (req, res) => {

  const ability = authorize.ability(req.current_user);
  if (ability.cannot('read', new User({ id: parseInt(req.params.id) }))) {

    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      stztus: 403
    })
  }

  const id = req.params.id.split('_')[0];

  const filePath = `${__rootDir}/storage/app/private/avatars/${id}_avatar.jpeg`;

  fs.access(filePath, fs.F_OK, (error) => {


    if (error) res.status(400).json({
      message: "Avatar not found.",
      status: 400
    });

    // Use path.resolve because when using `../..` it is considered malicious 
    res.sendFile(path.resolve(filePath));
  })

  // For download
  //res.download(file);
}



module.exports = getAvatar;
