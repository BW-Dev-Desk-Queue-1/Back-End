const router = require('express').Router();
const User = require('./userModel');
const authenticate = require('../auth/authenticate-middleware.js');

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      User.getUsersTickets(users).then(tickets => {
        console.log('returned users', tickets);
        res.status(200).json(tickets);
      });
    })

    .catch(err => {
      console.log('err', err);
      res.send(err);
    });
});

// get all tickets for a user
router.get('/:userId/tickets', authenticate, (req, res, next) => {
  const { userId } = req.params;

  if (userId === `${req.user.userId}`) {
    User.findAllTicketsByUserId(userId)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  } else
    res.status(401).json({
      message: 'the userId did not match!!'
    });
});
module.exports = router;

// get a single ticket information for a user
router.get('/:userId/tickets/:ticketId', authenticate, (req, res, next) => {
  const { userId, ticketId } = req.params;
  if (userId === `${req.user.userId}`) {
    User.findTicketByUserId(userId, ticketId)
      .then(item => res.status(200).json(item))
      .catch(err => next(err));
  } else
    res.status(401).json({
      message: 'The userId did not match!!'
    });
});

// create a ticket for a user
router.post('/:userId/tickets', authenticate, (req, res, next) => {
  const { userId } = req.params;
  console.log('req.user.id', req.user.userId);
  if (userId === `${req.user.userId}`) {
    let ticket = req.body;

    ticket = {
      ...ticket,
      user_id: userId
    };
    User.addTicket(ticket)
      .then(item => res.status(201).json(item))
      .catch(err => {
        console.log('err', err);
        next(err);
      });
  } else
    res.status(401).json({
      message: 'The userId did not match!!'
    });
});
// .catch(err => next(err));

// upate a ticket for a user
router.put('/:userId/tickets/:ticketId', authenticate, (req, res, next) => {
  const { userId, ticketId } = req.params;
  if (userId === `${req.user.userId}`) {
    let ticket = req.body;

    User.updateTicket(ticket, ticketId)
      .then(item => res.status(200).json(item))
      .catch(err => next(err));
  } else
    res.status(401).json({
      message: 'The userId did not match!!'
    });
});

// delete a ticket for a user
router.delete('/:userId/tickets/:ticketId', authenticate, (req, res, next) => {
  const { userId, ticketId } = req.params;
  if (userId === `${req.user.userId}`) {
    User.deleteTicket(ticketId)
      .then(item => res.status(200).json(item))
      .catch(err => next(err));
  } else
    res.status(401).json({
      message: 'The userId did not match!!'
    });
});
