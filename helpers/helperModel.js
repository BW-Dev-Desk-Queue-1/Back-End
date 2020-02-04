const HelperDb = require('../config/dbConfig');
// student ID
// access own tickets
// create new tickets
// helper ID
// colective ticket pool
// see own tickets
// reactions
// adding comments
module.exports = {
  addHelper,
  findByHelperName,
  find,
  findByHelperId
};
// my code
function find() {
  return HelperDb('helpers').select('id', 'username', 'password', 'accessType');
}
function addHelper(helper) {
  return HelperDb('helpers')
    .insert(helper, 'id')
    .then(([id]) => {
      console.log(id);
      return findByHelperId(id);
    });
}

function findByHelperName(userName) {
  return HelperDb('helpers').where('username', userName);
}

// Won's code
// find a user by Id
function findByHelperId(id) {
  return HelperDb('helpers')
    .where('id', id)
    .first();
}
