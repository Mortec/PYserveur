'use strict';
const ability = require('../../../services/abilities').ability;
const Teacher = require('../../../models/Teacher');
const logln = require('../../../utils/logln')





/**
 * Delete a Teacher
 */
const deleteTeacher = (req, res) => {

  const putTeacher = req.body;

  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('update', new Teacher({ id: parseInt(putTeacher.id) }))) {

    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    });
  }


  Teacher.destroy( {where : {id: putTeacher.id}}).then(teacher => {


    res.status(204).json({ message: 'Le professeur a été supprimé.' });

  }).catch(error => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400
    });
  })
}


module.exports = deleteTeacher;

