const router = require('express').Router();
const Ticket = require('./ticketModel');
const authenticate = require('../auth/authenticate-middleware.js');
// ermaining endpoints for reactions and gettng all tickets

module.exports = router
