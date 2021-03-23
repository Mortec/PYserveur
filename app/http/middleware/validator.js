const Joi = require('@hapi/joi');
const { sanitizeBody } = require('express-validator');

const dbEnums = require('../../../config/constants');
const logln = require('../../utils/logln')

const blackChars = "{}<>\\";



//
// // REGISTER
//
exports.register = (req, res, next) => {

  const schema = Joi.object({

    firstName: Joi.string().trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .required(),

    lastName: Joi.string().trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .required(),

    email: Joi.string().trim()
      .email()
      .required(),

    phone: Joi.string().trim()
      .pattern(/^((\+)33|0)[1-9](\d{2}){4}$/)
      .required(),

    password: Joi.string().trim()
      .pattern(/^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)
      .required(),

    passwordRepeat: Joi.ref('password')

  });


  const validation = schema.validate(req.body);

  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['firstName', 'lastName']).escape().blacklist(blackChars);

  next();
}



//
// // LOGIN
//
exports.login = (req, res, next) => {

  const schema = Joi.object({

    email: Joi.string().trim()
      .email()
      .required(),

    password: Joi.string().trim()
      .required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {

    res.status(400).json({ error: validation.error.details[0].message, status: 400 });
    return;
  }

  next();
}



//
// // PUT ME
//
exports.putMe = async (req, res, next) => {


  const schema = Joi.object({


    firstName: Joi.string().trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .optional(),

    lastName: Joi.string()
      .trim()
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .min(2)
      .max(100)
      .optional(),

    email: Joi.string()
      .trim()
      .email()
      .optional(),

    phone: Joi.string()
      .trim()
      .pattern(/^((\+)33|0)[1-9](\d{2}){4}$/)
      .optional(),

    healingConditions: Joi.string().trim()
      .max(300)
      .optional(),

    bio: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    website: Joi.string()
      .uri()
      .optional(),

    twitter: Joi.string()
      .uri()
      .optional(),

    facebook: Joi.string()
      .uri()
      .optional(),

    instagram: Joi.string()
      .uri()
      .optional(),

    prices: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    slug: Joi.string().trim()
      .optional()
  });

  const validation = schema.validate(req.body);

  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['firstName', 'lastName', 'healingConditions', 'bio', 'prices', 'slug']).escape().blacklist(blackChars);

  next();
}



//
// // POST USER
//
exports.postUser = (req, res, next) => {

  const schema = Joi.object({


    firstName: Joi.string().trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .required(),

    lastName: Joi.string().trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .required(),

    email: Joi.string().trim()
      .email()
      .required(),

    phone: Joi.string().trim()
      .pattern(/^((\+)33|0)[1-9](\d{2}){4}$/)
      .required(),

    password: Joi.string().trim()
      .pattern(/^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)
      .required(),

    passwordRepeat: Joi.ref('password'),

    role: Joi.any()
      .valid(dbEnums.ROLE_STUDENT, dbEnums.ROLE_TEACHER, dbEnums.ROLE_ADMIN)
      .required()
  });

  const validation = schema.validate(req.body);


  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['firstName', 'lastName']).escape().blacklist(blackChars);

  next();
}




//
// // PUT USER // PUT ME
//
exports.putUser = async (req, res, next) => {


  const schema = Joi.object({

    id: Joi.number().integer().required(),

    firstName: Joi.string().trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .optional(),

    lastName: Joi.string()
      .trim()
      .pattern(/^[a-zA-Zàâçéèêëîïôûùüÿñæœ .\-'’]*$/)
      .min(2)
      .max(100)
      .optional(),

    email: Joi.string()
      .trim()
      .email()
      .optional(),

    phone: Joi.string()
      .trim()
      .pattern(/^((\+)33|0)[1-9](\d{2}){4}$/)
      .optional(),

    healingConditions: Joi.string().trim()
      .max(300)
      .optional(),

    role: Joi.any()
      .valid(dbEnums.ROLE_STUDENT, dbEnums.ROLE_TEACHER, dbEnums.ROLE_ADMIN)
      .optional(),

    bio: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    website: Joi.string()
      .uri()
      .optional(),

    twitter: Joi.string()
      .uri()
      .optional(),

    facebook: Joi.string()
      .uri()
      .optional(),

    instagram: Joi.string()
      .uri()
      .optional(),

    prices: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    show: Joi.boolean()
      .optional(),

    slug: Joi.string().trim()
      .optional()
  });

  const validation = schema.validate(req.body);

  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['firstName', 'lastName', 'healingConditions', 'bio', 'prices', 'slug']).escape().blacklist(blackChars);

  next();
}



//
// // POST TEACHER
//
exports.postTeacher = async (req, res, next) => {

  const schema = Joi.object({

    bio: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    website: Joi.string()
      .uri()
      .optional(),

    twitter: Joi.string()
      .uri()
      .optional(),

    facebook: Joi.string()
      .uri()
      .optional(),

    instagram: Joi.string()
      .uri()
      .optional(),

    prices: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    show: Joi.boolean()
      .optional(),

    slug: Joi.string().trim()
      .optional()
  });

  const validation = schema.validate(req.body);

  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['firstName', 'lastName', 'healingConditions', 'bio', 'prices', 'slug']).escape().blacklist(blackChars);

  next();
}



//
// // PUT TEACHER
//
exports.putTeacher = async (req, res, next) => {


  const schema = Joi.object({

    id: Joi.number().integer().required(),

    bio: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    website: Joi.string().trim()
      .uri()
      .optional(),

    twitter: Joi.string().trim()
      .uri()
      .optional(),

    facebook: Joi.string().trim()
      .uri()
      .optional(),

    instagram: Joi.string().trim()
      .uri()
      .optional(),

    prices: Joi.string().trim()
      .min(2)
      .max(300)
      .optional(),

    show: Joi.boolean()
      .optional(),

    slug: Joi.string().trim()
      .optional()

  });

  const validation = schema.validate(req.body);


  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['bio', 'prices', 'slug']).escape().blacklist(blackChars);

  next();
}



//
// // POST COURSE
//
exports.postCourse = async (req, res, next) => {

  const schema = Joi.object({

    teacherId: Joi.number().integer().required(),

    title: Joi.string().trim()
      .min(2)
      .max(100)
      .required(),

    description: Joi.string().trim()
      .min(2)
      .max(300)
      .required(),

    level: Joi.any()
      .valid(dbEnums.COURSE_LEVEL_NEWBIE, dbEnums.COURSE_LEVEL_INTERMEDIATE, dbEnums.COURSE_LEVEL_ADVANCED)
      .required(),

    place: Joi.string().trim()
      .min(2)
      .max(100)
      .required(),

    cost: Joi.number()
      .required(),

    capacity: Joi.number().integer()
      .required(),

    startTime: Joi.date()
      .required(),

    duration: Joi.number()
      .required(),
  });

  const validation = schema.validate(req.body);


  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['title', 'description', 'place']).escape().blacklist(blackChars);


  next();
}



//
// // PUT COURSE
//
exports.putCourse = async (req, res, next) => {

  const schema = Joi.object({

    teacherId: Joi.number().integer().required(),

    title: Joi.string().trim()
      .min(2)
      .max(100)
      .optional(),

    description: Joi.string().trim()
      .min(2)
      .max(300),

    level: Joi.any()
      .valid(dbEnums.COURSE_LEVEL_NEWBIE, dbEnums.COURSE_LEVEL_INTERMEDIATE, dbEnums.COURSE_LEVEL_ADVANCED)
      .optional(),

    place: Joi.string().trim()
      .min(2)
      .max(100)
      .optional(),

    cost: Joi.number(),

    capacity: Joi.number().integer()
      .optional(),

    startTime: Joi.date()
      .optional(),

    duration: Joi.number()
      .optional(),

  });

  const validation = schema.validate(req.body);


  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  sanitizeBody(['title', 'description', 'place']).escape().blacklist(blackChars);

  next();
}



//
// // EMAIL CHECKING
//
exports.email = (req, res, next) => {


  const schema = Joi.object({

    email: Joi.string()
      .trim()
      .email()
      .required()
  });

  const validation = schema.validate(req.body);

  if (validation.error) {

    return res.status(400).json({ message: validation.error.details[0].message, status: 400 });
  }

  next();
}
