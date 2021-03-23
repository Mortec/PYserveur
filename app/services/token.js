'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
const logln = require('../utils/logln');



exports.decode = async (cookies) => {

  const { se, jp } = cookies;
  const jwtHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  const currentToken = `${jwtHeader}.${jp}.${se}`;

  return jwt.verify(currentToken, config.get('jwtPrivateKey'), (error, decoded) => {

    return decoded;
  })
}



exports.refresh = (res, payload) => {

  // Create a new token
  const token = jwt.sign(
    payload,
    config.get('jwtPrivateKey'),
    { expiresIn: '30m' },
  );

  const splittedToken = token.split('.');
  const tokenPayload = splittedToken[1];
  const signature = splittedToken[2];

  // Send a session cookie with the token signature (`se` for session)
  res.cookie('se', signature, {
    maxAge: (60 * 30) * 1000, // 30 minutes
    // domain: config.get('cookieDomain'),
    httpOnly: true,
    secure: false,
  });


  // Send a temporarary cookie (30 minute expiry) with the base64 payload inside (`jp` for jwt payload)
  res.cookie('jp', tokenPayload, {
    maxAge: (60 * 30) * 1000, // 30 minutes
    // domain: config.get('cookieDomain'),
    secure: false,
  });
}



exports.delete = (res) => {

  res.clearCookie('se', { domain: config.get('cookieDomain') });
  res.clearCookie('jp', { domain: config.get('cookieDomain') });
}
