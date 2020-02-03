const router = require('express').Router();
const Ticket = require('./ticketModel');
const authenticate = require('../auth/authenticate-middleware.js');

module.exports = router
