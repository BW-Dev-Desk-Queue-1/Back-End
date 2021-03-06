const UserDb = require('../config/dbConfig');
// student ID
// access own tickets
// create new tickets
// helper ID
// colective ticket pool
// see own tickets
// reactions
// adding comments
module.exports = {
  addUser,
  findByUserName,
  find,
  getUsersTickets,
  findAllTicketsByUserId,
  findTicketByUserId,
  addTicket,
  updateTicket,
  deleteTicket
};

// crud for a user
function find() {
  return UserDb('users').select('id', 'username', 'password', 'accessType');
}

function getUsersTickets(users) {
  const newUsers = users.map(user => {
    //  UserDb('tickets')
    //   .where('user_id', user.id)
    return findUserTickets(user.id).then(tickets => {
      user = {
        ...user,
        password: '*******',
        tickets: tickets || 'No tickets found'
      };
      console.log('user', user);
      return user;
    });
  });
  return Promise.all(newUsers);
}
// const myTickets = await findUserTickets(user.id);

function addUser(user) {
  return UserDb('users')
    .insert(user, 'id')
    .then(([id]) => {
      // console.log(id)
      return findByUserId(id);
    });
}

function findByUserName(userName) {
  return UserDb('users').where('username', userName);
}

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

// get all tickets for a user
function findAllTicketsByUserId(id) {
  return findByUserId(id).then(async user => {
    user.password = '*********';
    const myTickets = await findUserTickets(id);

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
    if (myTicket) myTicket.resolved = toResolved(myTicket.resolved);
    user.password = '*******';
    const myReactions = await UserDb('reactions').where('ticket_id', ticketId);
    const UserTicket = {
      ...user,
      ticket: myTicket || 'No ticket Found',
      reactions: myReactions
    };
    return UserTicket;
  });
}

// create a ticket for a user
function addTicket(ticket) {
  return UserDb('tickets')
    .insert(ticket, 'id')
    .then(result => {
      const [id] = result;

      return findByTicketId(id);
    });
}

// upate a ticket for a user
function updateTicket(ticket, ticketId) {
  return UserDb('tickets')
    .update(ticket)
    .where('id', ticketId)
    .then(num =>
      num ? ticket : { message: 'Failed to update in the server' }
    );
}

// delete a ticket for a user
function deleteTicket(ticketId) {
  return UserDb('tickets')
    .where('id', ticketId)
    .first()
    .delete();
}
