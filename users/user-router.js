const router = require('express').Router();
const User = require('./userModel');
const authenticate = require('../auth/authenticate-middleware.js');
// console.log('here')

router.get('/find', (req, res) => {
  // console.log(req.query)
  User.filterTickets(req.query.resolved)
    .then(tickets => {
      console.log('tickets', tickets)
      if(tickets.length > 0) {
        res.status(200).json(tickets)
      } else {
        res.status(500).json({message: `There are no ${req.query.resolved === 'true'? 'resolved': 'unresolved'} tickets`})
      }
    })
})
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
// You can use get request ‘/api/tickets?resolved=false’
// which we can access with req.query object

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
  if (userId === `${req.user.userId}`) {
    let ticket = req.body;
    ticket = {
      ...ticket,
      user_id: req.user.userId
    };
    User.addTicket(ticket)
      .then(item => res.status(201).json(item))
      .catch(err => next(err));
  } else
    res.status(401).json({
      message: 'The userId did not match!!'
    });
});

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

// my code
router.get('/get', (req, res) => {
  User.getAllTickets()
    .then(tickets => {
      res.status(200).json(tickets)
      // console.log(tickets)
    })
    .catch(err => {
      res.status(401).json({message: 'Cannot get tickets'})
    })
})
//