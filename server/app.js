/**
 * Main application file
 */




// mongod --dbpath c:/mongodb/data/webdev


// Overview

// │
// ├── client
// │   ├── app                 - All of our app specific components go in here
// │   ├── assets              - Custom assets: fonts, images, etc…
// │   ├── components          - Our reusable components, non-specific to to our app
// │
// ├── e2e                     - Our protractor end to end tests
// │
// └── server
//     ├── api                 - Our apps server api
//     ├── auth                - For handling authentication with different auth strategies
//     ├── components          - Our reusable or app-wide components
//     ├── config              - Where we do the bulk of our apps configuration
//     │   └── local.env.js    - Keep our environment variables out of source control
//     │   └── environment     - Configuration specific to the node environment
//     └── views               - Server rendered views



// An example client component in client/app

//  app
//  │
//  ├── main
//  │   ├── main.js                 - Routes/Module
//  │   ├── main.controller.js      - Controller for our main route
//  │   ├── main.controller.spec.js - Test
//  │   ├── main.html               - View
//  │   └── main.less               - Styles
//  │
//  ├── account
//  │  	├── admin
//  │  	│	├── admin.js                 - Routes/Module
//  │  	│	├── admin.controller.js      - Controller for our admin route
//  │  	│	├── admin.controller.spec.js - Test
//  │  	│	├── admin.html               - View
//  │  	│	└── admin.less               - Styles
//  │   │
//  │  	├── login
//  │  	│	├── login.controller.js      - Controller for our login route
//  │  	│	└── login.html               - View
//  │   │
//  │  	├── settings
//  │  	│	├── settings.controller.js   - Controller for our settings route
//  │  	│	└── settings.html            - View
//  │   │
//  │  	├── signup
//  │   │   ├── signup.controller.js     - Controller for our signup route
//  │   │   └── signup.html              - View
//  │   │
//  │   └── account.js                   - Routes/Module
//  │
//  ├── app.constant.js
//  ├── app.js                           - Routes/Module
//  └── app.less                         - Styles 



// An example server component in server/api

// thing
// ├── index.js                - Routes ( define routes for all thing controllers )
// ├── thing.controller.js     - Controller for our `thing` endpoint
// ├── thing.model.js          - Database model
// ├── thing.socket.js         - Register socket events
// └── thing.spec.js           - Test


// npm install mocha --save          (needed when jasmine is used for testing)



//yo angular-fullstack:endpoint dogs
//yo angular-fullstack:route dogdex







'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
