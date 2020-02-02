const router = require('express').Router();
const User = require('./userModel');

// get all tickets for a user
router.get('/:userId/tickets', (req, res, next) => {
  const { userId } = req.params;
  console.log('req.params', req.params);
  User.findAllTicketsByUserId(userId)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});
module.exports = router;

// get a single ticket information for a user
router.get('/:userId/tickets/:ticketId', (req, res, next) => {
  const { userId, ticketId } = req.params;
  User.findTicketByUserId(userId, ticketId)
    .then(item => res.status(200).json(item))
    .catch(err => next(err));
});

// create a ticket for a user

// upate a ticket for a user

// delete a ticket for a user
