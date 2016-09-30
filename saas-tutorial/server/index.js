// Importing Node modules and initializing Express
const express = require('express'),
      app = express(),
      logger = require('morgan'),
      config = require('./config/main');


// Start the server
const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials                                                 ");
  res.header("Access-Controll-Allow-Credentials", "true");
})
