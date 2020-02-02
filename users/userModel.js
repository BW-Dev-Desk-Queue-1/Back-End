const UserDb = require('../config/dbConfig');

module.exports = {
  findByUserId
};

function findByUserId(id) {
  return UserDb('users').where({ id });
}
