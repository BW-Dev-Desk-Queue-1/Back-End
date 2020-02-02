
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'young123', password: '123456' },
        {id: 2, username: 'james123', password: '123456' },
        {id: 3, username: 'sunny123', password: '123456' }
      ]);
    });
};
