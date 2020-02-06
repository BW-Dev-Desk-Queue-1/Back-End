const router = require('express').Router();
const Ticket = require('./ticketModel');
const User = require('../users/userModel');

const Reaction = require('../reactions/reactionModel')

const authenticate = require('../auth/authenticate-middleware.js');
const onlyFor = require('../auth/onlyFor');

// ermaining endpoints for reactions and gettng all tickets

// works locally
// get all tickets with reactions
// works locally
router.get('/', authenticate, onlyFor, (req, res) => {
    Ticket.getAllTickets()
        .then(tickets => {

            res.status(200).json(tickets);

        })
        .catch(err => {
        console.log('err', err);
        res.status(500).json(err);
        });
      
})
// works locally
router.get('/find', authenticate, onlyFor, (req, res) => {
    // console.log(req.query)
    Ticket.filterTickets(req.query.resolved)
      .then(tickets => {
        console.log('tickets', tickets)
        if(tickets.length > 0) {
          res.status(200).json(tickets)
        } else {
          res.status(500).json({message: `There are no ${req.query.resolved === 'true'? 'resolved': 'unresolved'} tickets`})
        }
      })
  })
// my code

  
// ask him for help if I really can't get his code
// ## get: get a single ticket info with related reactions
// works locally
router.get('/:ticketId', authenticate, onlyFor, (req, res) => {
    // console.log('here', req.params.ticketId)
    Ticket.getIthTicketWithReactions(req.params.ticketId)
        .then(ithTickedWithReactions => {
        // console.log(ticket)
        
            res.status(200).json(ithTickedWithReactions)
        })
        .catch(err => {
        res.status(401).json({message: `Cannot get tickets by id ${req.params.ticketid}`})
        })
})
  

// all the above work
// reaction crud here for the tickets
// create a reaction
// works locally
router.post('/:ticketId/reactions/', authenticate, onlyFor, (req, res) => {
    const { ticketId } = req.params;
    // console.log('here')
    // console.log(req.body)
    let reaction = req.body;
    reaction = {
      ...reaction,
      ticket_id: ticketId
    };
    Reaction.addReaction(reaction)
            .then(reaction => res.status(201).json(reaction))
            .catch(err => res.status(500).json({error: err}));


})
// update a reaction
// works locally
router.put('/:ticketId/reactions/:reactionId', authenticate, onlyFor, (req, res) => {
    const { ticketId, reactionId } = req.params;
    // console.log(req.bo dy, req.params)
    let reaction = req.body;
    Ticket.findByTicketId(ticketId)
        .then(ticket => {
            // console.log(ticket)
            Reaction.updateReaction(reaction, reactionId)
            .then(reaction => res.status(200).json(reaction))
            .catch(err => res.status(500).json({error: err}));
        })

})
// delete a reaction
//
// stole template
router.delete('/:ticketId/reactions/:reactionId', authenticate, onlyFor, (req, res, next) => {
    const { ticketId, reactionId } = req.params;
    // console.log(req.params)
    // find the ith reaction
    Ticket.findByTicketId(ticketId)
        .then(ticket => {
            Reaction.deleteReaction(reactionId)
            .then(reaction => res.status(200).json(reaction))
            .catch(err => res.status(500).json({error: err}));

        })
    // make sure it links to ticket id
    // then delete it
    // if (ticketId === `${req.params.ticketId}`) {
    //     Reaction.deleteReaction(reactionId)
    //     .then(reaction => res.status(200).json(reaction))
    //     .catch(err => next(err));
    // } else
    //   res.status(401).json({
    //     message: 'The ticketId did not match!!'
    //   });
  });


function verifyId(req, res, next) {
    // console.log('verify')
    // console.log(req.body, req.params)
    const { ticketId } = req.params;
    // console.log(req.body.ticketId, `${ticketId}`)
    if(ticketId === `${req.body.ticket_id}`) {
        next()
    } else {
        res.status(401).json({
            message: `The ticketId ${ticketId} did not match with the body ticket ${req.body.ticket_id}!!`
          });
    }
}
// update a ticket by helper

router.put('/:ticketId', authenticate, onlyFor, (req, res, next) => {
  const {ticketId } = req.params;
 
    let ticket = req.body;

    User.updateTicket(ticket, ticketId)
      .then(item => res.status(200).json(item))
      .catch(err => next(err));
  
});

module.exports = router
