'use strict';
const config = require('config');
const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const csrf = require('csurf');

//debug
const logln = require('./app/utils/logln');

//database
const db = require('./database/database')


// Middleware
const auth = require('./app/http/middleware/auth');

// Routes
const routes = require('./routes/routes');

// ORM
const doModelsRelations = require('./database/models-relations');


// Server params
const port = 3001;

const app = express();

// Integrated middleware
app.use(morgan('dev'));
app.use(helmet())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression())
app.use(cors({ 
  origin: config.get('allowOrigin'),
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
}));

// app.use(csrf({ cookie: true }));

// Middleware
app.use(auth);

// Routes
app.use(routes);


// ORM
doModelsRelations();

// db.sync({ force: true }).then(resp => {

//   const fixture = require('./database/fixture');
//   fixture(20,5);

// }).then( ( ) => {

//   app.listen(port, () => logln(`Server Started on port ${port}`) ) 

// }).catch(error => {

//   console.log('Database synchronization error : \n', error);
// })

  app.listen(port, () =>  {

    logln(`Server Started on port ${port}`)
  });
