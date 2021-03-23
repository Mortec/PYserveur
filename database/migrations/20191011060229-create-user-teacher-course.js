'use strict';

const constants = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('users', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      
        phone: {
          type: Sequelize.STRING,
        },
      
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
      
        avatarUrl: {
          type: Sequelize.STRING
        },
      
        healingConditions: {
          type: Sequelize.TEXT
        },
      
        medicalCertificateUrl: {
          type: Sequelize.STRING
        },
      
        status: {
          type: Sequelize.ENUM,
          values: constants.STATUS_ENUM,
          allowNull: false,
          defaultValue: constants.STATUS_PENDING
        },
      
        token: {
          type: Sequelize.STRING,
        },
      
        resetTokenExpiresAt: {
          type: Sequelize.DATE,
        },
      
        lastConnectedAt: {
          type: Sequelize.DATE,
        },
      
        role: {
          type: Sequelize.ENUM,
          values: constants.ROLE_ENUM,
          allowNull: false,
          defaultValue: constants.ROLE_STUDENT
        },

        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      
      }),
      queryInterface.createTable('teachers', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        // Foreign key
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
           model: "users",
           key: "id"
          }
        },
      
        bio: {
          type: Sequelize.TEXT,
        },
      
        website: {
          type: Sequelize.STRING,
        },
      
        facebook: {
          type: Sequelize.STRING,
        },
      
        twitter: {
          type: Sequelize.STRING,
        },
      
        instagram: {
          type: Sequelize.STRING
        },
      
        prices:{
          type: Sequelize.TEXT
        },
      
        show:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: 0
        },
      
        slug:{
          type: Sequelize.STRING,
        },

        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      
      }),
      queryInterface.createTable('courses', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        
        // Foreign key
        teacherId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
           model: "teachers",
           key: "id"
          }
        },
      
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      
        description: {
          type: Sequelize.TEXT,
        },
      
        pictureUrl: {
          type : Sequelize.STRING,
        },
      
        level: {
          type: Sequelize.ENUM,
          values: constants.COURSE_LEVEL_ENUM,
          allowNull: false,
          defaultValue: constants.COURSE_LEVEL_NEWBIE,
        },
      
        place: {
          type: Sequelize.STRING,
          allowNull: false
        },
      
        cost: {
          type: Sequelize.FLOAT,
        },
      
        capacity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
      
        startTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      
        duration: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      
      }),
      queryInterface.createTable('courseUsers', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        // Foreign key
        courseId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "courses",
            key: "id"
          }
        },

        // Foreign key
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id"
          }
        },

        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,

      }),
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('courseUsers'),
      queryInterface.dropTable('courses'),
      queryInterface.dropTable('teachers'),
      queryInterface.dropTable('users'),
    ]);
  }
};
