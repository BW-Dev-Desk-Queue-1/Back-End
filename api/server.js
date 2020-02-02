
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const userRouter = require('../users/user-router');
const authRouter = require('../auth/auth-router');
const ticketRouter = require('../tickets/ticket-router');

server.use(express.json());

server.use(cors());
server.use(helmet());
console.log('here')
// for register and login
server.use('/api', authRouter);

// for users
server.use('/api/users', userRouter);
// for tickets
server.use('./api/tickets', ticketRouter);

// middleware for all status 500 errors

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err.message
  });
});

module.exports = server;
