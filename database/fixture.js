'use strict';
const faker = require('faker');
const logln= require('../app/utils/logln')
// Constants
const db_enums = require('../config/constants');

// Models
const User = require('../app/models/User')
const Teacher = require('../app/models/Teacher')
const CourseUser = require('../app/models/Course-User')
// Well-known password used for test :)
const pass = '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.';



const fixture = (nStudent, nTeacher) => {

  faker.locale = "fr";

  const admin = {
    firstName: 'Alexandre',
    lastName: 'Videcoq',
    email: 'admin@yoga.com',
    phone: '0684759635',
    password: pass,
    avatarUrl: 'https://i.pravatar.cc/300',
    role: db_enums.ROLE_ADMIN
  }

  User.create(admin).then(user => user.addTeacher({

    bio: faker.lorem.paragraph(5),
    website: faker.internet.domainName(),
    facebook: faker.internet.domainName(),
    twitter: faker.internet.domainName(),
    instagram: faker.internet.domainName(),
    show: true,
    slug: faker.lorem.slug(2)
  })).catch( error => logln(error, 'USER') );

  for (let i = 0; i < nStudent; i++) {

    let student = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      password: pass,
      avatarUrl: faker.image.avatar(),
      healingConditions:faker.lorem.paragraph( 5 ),
      role: db_enums.ROLE_STUDENT
    }
    User.create(student).then().catch( error =>logln(error, 'USER' ) );
  }

  for (let i = 0; i < nTeacher; i++) {

    let userAndTeacher = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      password: pass,
      avatarUrl: faker.image.avatar(),
      healingConditions:faker.lorem.paragraph( 5 ),
      role: db_enums.ROLE_TEACHER
    }

    User.create(userAndTeacher).then(user => user.createTeacher({

      bio: faker.lorem.paragraph(5),
      website: faker.internet.domainName(),
      facebook: faker.internet.domainName(),
      twitter: faker.internet.domainName(),
      instagram: faker.internet.domainName(),
      show: true,
      slug: faker.lorem.slug(2)
    }).then(teacher => {

      for (let i = 0; i < 15; i++) {

        teacher.createCourse({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(3),
          pictureUrl: faker.image.nature(600, 400),
          level: db_enums.COURSE_LEVEL_NEWBIE,
          place: faker.address.country(),
          cost: faker.random.number(1, 3),
          capacity: faker.random.number(15) +5,
          startTime: faker.date.future(2019),
          duration: (faker.random.number(5)+1)*30
        }).then( course => {

          const participants = Math.floor(Math.random()*course.capacity);
          
          for (let i = 0; i<participants; i++){

            
            const userId = Math.floor(Math.random()*nStudent) + 1;

            CourseUser.findAll( {where: {userId: userId}}
              ).then( courseUser =>{
                if (courseUser.length>0)  ;
                else{

                  User.findByPk(userId)
                    .then( user => course.addUser( user) )
                    .catch( error => logln(error, 'TEACHER') )
      
                  course.update( {participants: course.participants+1} );
                  course.save();

                }
              }).catch( error => logln(error, 'COURSE_USER') );

          }


          //courses
        }).catch( error => logln(error, 'COURSES') )
      }
      //teacher
    }).catch( error => logln(error, 'TEACHER') )
    //user
    ).catch( error => logln(error, 'USER') );

  }//for userandteacher

}

module.exports = fixture;
