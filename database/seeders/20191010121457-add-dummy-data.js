'use strict';
const faker = require('faker');

const constants = require('../../config/constants');
const shuffleArray = require('../../app/utils/shuffleArray');

faker.locale = "fr";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const passwordHash = '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.';

    const admin = {
      firstName: 'Alexandre',
      lastName: 'Videcoq',
      email: 'admin@yoga.com',
      phone: '+33658895774',
      password: passwordHash,
      avatarUrl: '',
      healingConditions: faker.lorem.paragraph(5),
      role: constants.ROLE_ADMIN,
      status: constants.STATUS_ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const teachers = [];
    for (let i = 0; i < 5; i++) {
      teachers.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: '+33658895774',
        password: passwordHash,
        avatarUrl: '',
        healingConditions: faker.lorem.paragraph(5),
        role: constants.ROLE_TEACHER,
        status: constants.STATUS_ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const students = [];
    for (let i = 0; i < 50; i++) {
      students.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: '+33658895774',
        password: passwordHash,
        avatarUrl: '',
        healingConditions: faker.lorem.paragraph(5),
        role: constants.ROLE_STUDENT,
        status: constants.STATUS_ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    const demoUsers = [admin, ...teachers, ...students];

    return queryInterface.bulkInsert('users', demoUsers, {})
    .then(() => {
      const demoTeachers = [];
      for (let i = 0; i < 6; i++) {
        demoTeachers.push({
          bio: faker.lorem.paragraph(5),
          website: faker.internet.url(),
          facebook: faker.internet.avatar(),
          twitter: faker.internet.avatar(),
          instagram: faker.internet.avatar(),
          show: true,
          slug: faker.lorem.slug(2),
          userId: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
  
      return queryInterface.bulkInsert('teachers', demoTeachers, {});
    })
    .then(() => {
      const levels = [
        constants.COURSE_LEVEL_NEWBIE,
        constants.COURSE_LEVEL_INTERMEDIATE,
        constants.COURSE_LEVEL_ADVANCED,
      ]
  
      const teachersIds = [1, 2, 3, 4, 5, 6];
  
      const demoCourses = [];
      demoCourses.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(3),
        pictureUrl: '',
        level: constants.COURSE_LEVEL_INTERMEDIATE,
        place: faker.address.country(),
        cost: faker.random.number(1, 6),
        capacity: 5,
        startTime: faker.date.future(2019),
        duration: (faker.random.number(5) + 1) * 30,
        teacherId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      for (let i = 0; i < 29; i++) {
        const level = shuffleArray(levels)[0];
        const teacherId = shuffleArray(teachersIds)[0];
        demoCourses.push({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(3),
          pictureUrl: '',
          level,
          place: faker.address.country(),
          cost: faker.random.number(1, 3),
          capacity: faker.random.number(5) + 5,
          startTime: faker.date.future(2019),
          duration: (faker.random.number(5) + 1) * 30,
          teacherId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
  
      return queryInterface.bulkInsert('courses', demoCourses, {});
    })
    .then(() => {
      // Some participants: 1 admin, 2 teachers and 15 students
      const participantsIds = [1, 4, 5, 7, 8, 9, 10, 11, 12, 13, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 41, 48, 51 ];
      
      const demoCourseUser = [];
      // For the 30 courses
      for (let i = 0; i < 30; i++) {

        const userId = shuffleArray(participantsIds);
        // 5 participants per course
        for (let j = 0; j < 5; j++) {
          demoCourseUser.push({
            userId: userId[j],
            courseId: i + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
  
      return queryInterface.bulkInsert('courseUsers', demoCourseUser, {});
    })
    .catch((error) => {
      console.log(error);
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('courseUsers', null, {}),
      queryInterface.bulkDelete('courses', null, {}),
      queryInterface.bulkDelete('teachers', null, {}),
      queryInterface.bulkDelete('users', null, {}),
    ]);
  }
};
