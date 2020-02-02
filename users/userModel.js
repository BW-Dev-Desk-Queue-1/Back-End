const UserDb = require('../config/dbConfig');

module.exports = {
  findAllTicketsByUserId,
  findTicketByUserId
};

function toResolved(bool) {
  if (bool) return true;
  else return false;
}
// find all tickets

async function findUserTickets(id) {
  const myTickets = await UserDb('tickets').where('user_id', id);

  myTickets &&
    myTickets.map(el => {
      el.resolved = toResolved(el.resolved);
      return el;
    });

  return myTickets;
}

// find a user by Id
function findByUserId(id) {
  return UserDb('users')
    .where({ id })
    .first();
}

// get all tickets for a user
function findAllTicketsByUserId(id) {
  return findByUserId(id).then(async user => {
    user.password = '*********';
    const myTickets = await findUserTickets(id);
    console.log('mytickets', myTickets);
    const toResponse = {
      ...user,
      tickets: myTickets
    };
    return toResponse;
  });
}

// get a single ticket information for a user

function findTicketByUserId(userId, ticketId) {
  return findByUserId(userId).then(async user => {
    const myTicket = await UserDb('tickets')
      .where({ id: ticketId, user_id: userId })
      .first();
    myTicket.resolved = toResolved(myTicket.resolved);
    user.password = '*******';
    const UserTicket = {
      ...user,
      ticket: myTicket || 'No Ticket Found'
    };
    return UserTicket;
  });
}

// create a ticket for a user

// upate a ticket for a user

// delete a ticket for a user
