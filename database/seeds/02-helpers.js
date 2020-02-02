
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('helpers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('helpers').insert([
        {id: 1, username: 'mike123', password: '123456', accessType: 'helper' },
        {id: 2, username: 'tim123', password: '123456', accessType: 'admin'},
        {id: 3, username: 'jake123', password: '123456', accessType: 'helper'}
      ]);
    });
};

