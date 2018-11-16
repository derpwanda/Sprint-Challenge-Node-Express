const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const projectRouter = require('../projects/projectRouter');
const actionRouter = require('../actions/actionRouter');

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(morgan('dev')); //short

  //add endpoints here (route handlers)
  server.use('/api/projects', projectRouter);
  server.use('/api/actions', actionRouter);
}