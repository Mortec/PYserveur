'use strict';
const ability = require('../../../services/abilities').ability;
const Teacher = require('../../../models/Teacher');
const logln = require('../../../utils/logln')





/**
 * Create a Teacher
 */

const createTeacher = (req, res) => {


  const currentAbility = ability(req.current_user);
  if (currentAbility.cannot('create', 'Teacher')){ 
    
    return res.status(403).json({
      message: 'Vous n’avez pas l’autorisation',
      status: 403
    });
  }


  const teacher = req.body;

  Teacher.create(teacher).then(teacher => {

    res.status(200).json({ message: 'Professeur a été ajouté.', teacher: teacher });

  }).catch(error => {

    res.status(400).json({
      message: 'Requête erronée',
      status: 400
    });
  })
}


module.exports = createTeacher;

