const UserDb = require('../config/dbConfig')

module.exports = {  
  
    filterTickets,
    getAllTickets,
    findByTicketId,
    getIthTicketWithReactions
}

function getAllTickets() {
    return UserDb('tickets')
        .select('*')
        .then(tickets => {
            return Promise.all(tickets.map(async ticket => {
                const reactions = await UserDb('reactions')
                    .where('ticket_id', ticket.id)
                return {
                    ...ticket,
                    reactions: reactions
                }
            }))
        })
}
function toResolved(bool) {
    if (bool) return true;
    else return false;
  }
  
// if it works locally on postman merge it
// then test it on heroku
// don't need to ask him to check the code
// if I need help for doing this let him know
// find a ticket by Id
function findByTicketId(id) {
    return UserDb('tickets')
      .where({ id })
      .first()
      .then(ticket => {
        return {
          ...ticket,
          resolved: toResolved(ticket.resolved)
        };
      });
  }

  /// David's code
  
  function filterTickets(isResolved) {
    return UserDb('tickets')
    // 'true' != true
      .where('resolved', '=', isResolved === 'true'? true: false)
      
  }
  
//   function getAllTickets() {
//     return UserDb('tickets')
//         .select('*')
//   }
//   function getUsersTickets(users) {
//     const newUsers = users.map(user => {
//       //  UserDb('tickets')
//       //   .where('user_id', user.id)
//       return findUserTickets(user.id).then(tickets => {
//         user = {
//           ...user,
//           password: '*******',
//           tickets: tickets || 'No tickets found'
//         };
//         console.log('user', user);
//         return user;
//       });
//     });
//     return Promise.all(newUsers);
//   }
  
  function getIthTicketWithReactions(ticketId) {
    
    return findByTicketId(ticketId)
      .then(ticket => {
          // {ticket_data, reactations: []}
          // find all the reactions and 
          return UserDb('reactions')
            .select('*')
            .where('ticket_id', ticketId)
            .then(reactions => {
                // console.log(reactions)
                return {...ticket, reactions: reactions}
            })
  
      })
    
  }
  ///
