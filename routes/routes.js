'use strict';
const express = require('express');
const __rootDir = require('../app/utils/rootDir');
const logln = require('../app/utils/logln');

// Controllers
const MeController = require('../app/http/controllers/MeController/MeController');
const UserController = require('../app/http/controllers/UserController/UserController');
const CourseController = require('../app/http/controllers/CourseController/CourseController');
const TeacherController = require('../app/http/controllers/TeacherController/TeacherController');
const MessageController = require('../app/http/controllers/MessageController/MessageController');
const EmailController = require('../app/http/controllers/emails');

// Middleware
const validator = require('../app/http/middleware/validator');
const uploader = require('../app/http/middleware/uploader');




// Router
const router = express.Router();

// 
// //BASIC
// 
router.get('/', function (req, res) { return res.json( {server: 'started'} ) });



// 
// //CURRENT USER
// 
router.post('/register', validator.register, MeController.register);
router.post('/logins', validator.login, MeController.login);
router.post('/logouts', MeController.logout);
router.get('/me', MeController.me);
router.put('/me', validator.putMe, uploader.avatar.single('file'), MeController.updateMe);



// 
// //USERS
// 
router.get('/users', UserController.getUsers );
router.get('/users/:id', UserController.getUser);
router.post('/users', validator.postUser, UserController.createUser );
router.put('/users/:id', validator.putUser, uploader.avatar.single('file'), UserController.updateUser );
router.delete('/users/:id', UserController.deleteUser);

router.get('/avatars/:id', UserController.getAvatar);
router.get('/users/:id/avatar', UserController.getAvatar);

router.get('/users/:id/courses', UserController.getUserCourses);



// 
// //COURSES
// 
router.get('/courses', CourseController.getCourses);
router.get('/courses/:id', CourseController.getCourse);
router.post('/courses', validator.postCourse, CourseController.createCourse );
router.put('/courses/:id', validator.putCourse, CourseController.updateCourse );
router.delete('/courses/:id', CourseController.deleteCourse);

router.get('/courses/:id/users', CourseController.getCourseUsers);
router.patch('/courses/:id/add/users/:userId', CourseController.courseAddUser);
router.patch('/courses/:id/remove/users/:userId', CourseController.courseRemoveUser);



// 
// //TEACHERS
// 
router.get('/teachers', TeacherController.getTeachers);
router.delete('/teachers', TeacherController.deleteTeacher);
router.post('/teachers', validator.postTeacher, TeacherController.createTeacher);
router.put('/teachers', validator.putTeacher, TeacherController.updateTeacher);
router.get('/teachers/:id', TeacherController.getTeacher);

router.get('/teachers/:id/courses', TeacherController.getTeacherCourses);



// 
// //MESSAGES
// 
router.post('/contacts', MessageController.contact);



// 
// //CHECK
// 
router.post('/emails', validator.email, EmailController.checkEmail );



module.exports = router;
