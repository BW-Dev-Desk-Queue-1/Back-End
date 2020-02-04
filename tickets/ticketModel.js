const UserDb = require('../config/dbConfig');

module.exports = {
    getAllTickets
}

function getAllTickets() {
    return UserDb('tickets')
        .select('*')
}

