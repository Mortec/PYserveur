'use strict';
const ability = require('../../../services/abilities').ability;
const Course = require('../../../models/Course');
const logln = require('../../../utils/logln');





/**
 * Delete course
 */

const deleteCourse = (req, res) => {


  Course.findByPk(req.params.id).then(course => {


    const currentAbility = ability(req.current_user);
    if (currentAbility.cannot('delete', course)) {

      return res.status(403).json({
        message: 'Vous n’avez pas l’autorisation',
        status: 403
      });
    }


    Course.destroy({ where: { id: course.id } }).then((course) => {

      res.status(204).json({ message: 'Le cours a été supprimé.' });

    }).catch((error) => {

      return res.status(500).json({
        message: 'Erreur serveur (delete)',
        status: 500
      });
    });


  }).catch((error) => {

    return res.status(500).json({
      message: 'Erreur serveur (delete)',
      status: 500
    });
  });
}



module.exports = deleteCourse;

