'use strict';
const token = require('../../../services/token')


const logout = (req, res) => {

  token.delete(res);

  return res.status(200).json({ message: "Vous êtes déconnecté." });
}

module.exports = logout;
