const router = require('express').Router();
const Ticket = require('./ticketModel');
const Reaction = require('../reactions/reactionModel')

const authenticate = require('../auth/authenticate-middleware.js');
// ermaining endpoints for reactions and gettng all tickets

// works locally
// get all tickets with reactions
// works locally
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
// works locally
router.get('/find', (req, res) => {
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
router.get('/:ticketId', (req, res) => {
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
  


// reaction crud here for the tickets
// create a reaction

router.post('/:ticketId/reactions/', verifyId, (req, res) => {
    // const { ticketId, reactionId } = req.params;
    console.log('here')
    let reaction = req.body;
    reaction = {
      ...reaction,
      ticket_id: req.ticket.ticketId
    };
    Reaction.addReaction(reaction)
            .then(reaction => res.status(201).json(reaction))
            .catch(err => next(err));


})
// update a reaction
router.put('/:ticketId/reactions/:reactionId', verifyId, (req, res) => {
    const { ticketId, reactionId } = req.params;

    let reaction = req.body;

    Reaction.updateReaction(reaction, reactionId)
      .then(reaction => res.status(200).json(reaction))
      .catch(err => next(err));

})
// delete a reaction
//
// stole template
router.delete('/:ticketId/reactions/:reactionId', (req, res, next) => {
    const { ticketId, reactionId } = req.params;
    if (ticketId === `${req.ticket.ticketId}`) {
        Reaction.deleteReaction(reactionId)
        .then(reaction => res.status(200).json(reaction))
        .catch(err => next(err));
    } else
      res.status(401).json({
        message: 'The userId did not match!!'
      });
  });


function verifyId(req, res, next) {
    console.log('verify')
    console.log(req.body, req.params)
    const { ticketId } = req.params;

    if(ticketId === `${req.ticket.ticketId}`) {
        next()
    } else {
        res.status(401).json({
            message: 'The ticketId did not match!!'
          });
    }
}

module.exports = router
