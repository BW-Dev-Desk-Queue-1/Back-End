const router = require('express').Router();
const Ticket = require('./ticketModel');
const authenticate = require('../auth/authenticate-middleware.js');
// ermaining endpoints for reactions and gettng all tickets

router.get('/', (req, res) => {
    Ticket.getAllTickets()
        .then(tickets => {

            res.status(200).json(tickets);

        })
        .catch(err => {
        console.log('err', err);
        res.status(500).json(err);
        });
      
})
module.exports = router
