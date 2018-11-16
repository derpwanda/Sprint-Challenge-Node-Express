//import node modules
const express = require('express');
const server = express();

//middleware routers
const configureMiddleware = require('../config/routers.js');

//middleware
configureMiddleware(server); //server passed as params

module.exports = server;