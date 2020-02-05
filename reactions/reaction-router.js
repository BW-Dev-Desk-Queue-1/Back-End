// ignore these routes

const router = require('express').Router();
const Reactions = require('./reactionModel');
const authenticate = require('../auth/authenticate-middleware.js');



// create a reaction
router.post('/:ticketId/reactions', (req, res) => {
  
})
// update a reaction
router.put('/:ticketId/reactions/re')
// delete a reaction
//

router.delete('/:userId/tickets/:ticketId', authenticate, (req, res, next) => {
    const { userId, ticketId } = req.params;
    if (userId === `${req.user.userId}`) {
      Ticket.deleteTicket(ticketId)
        .then(item => res.status(200).json(item))
        .catch(err => next(err));
    } else
      res.status(401).json({
        message: 'The userId did not match!!'
      });
  });

// router.delete('/:userId/tickets/:ticketId', authenticate, (req, res, next) => {
//     const { userId, ticketId } = req.params;
//     if (userId === `${req.user.userId}`) {
//       Ticket.deleteTicket(ticketId)
//         .then(item => res.status(200).json(item))
//         .catch(err => next(err));
//     } else
//       res.status(401).json({
//         message: 'The userId did not match!!'
//       });
//   });
module.exports = router
