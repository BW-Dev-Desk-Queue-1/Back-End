const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('helpers').del()
    .then(function () {
      // Inserts seed entries
      return knex('helpers').insert([
        {id: 1, username: 'mike123', password: bcrypt.hashSync('123456', 5), accessType: 'helper' },
        {id: 2, username: 'tim123', password: bcrypt.hashSync('123456', 5), accessType: 'admin'},
        {id: 3, username: 'jake123', password: bcrypt.hashSync('123456', 5), accessType: 'helper'}
      ]);
    });
};

