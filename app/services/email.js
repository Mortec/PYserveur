'use strict';
const logln = require('../utils/logln')


exports.send = async message => {

  const mailjet = require('node-mailjet').connect('786e7047316a439f4ce4d810044dec73', '3730b8324c2ba8762b49f1d04b532a66');

  const request = mailjet
  .post("send", { 'version': 'v3.1' })
  .request({
    "Messages": [
      {
        "From": {
          "Email":  "sergeant.ben@me.com",//message.from.email,
          "Name": message.from.name
        },
        "To": [
          {
            "Email": message.to.email,
            "Name": message.to.name
          }
        ],
        "Subject": message.subject,
        "TextPart": message.text,
        "HTMLPart": message.html,
        "CustomID": "IDENTIFICATIONTRESSPECIALE"
      }
    ]
  });


  await request.then( result => {

    return result;

  }).catch( error => {

    return error.statuscode;
  })
}
