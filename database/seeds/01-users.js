
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'young123', password: bcrypt.hashSync('123456', 5), accessType: 'student'},
        {id: 2, username: 'james123', password: bcrypt.hashSync('123456', 5), accessType: 'student'},
        {id: 3, username: 'sunny123', password: bcrypt.hashSync('123456', 5), accessType: 'student'}
      ]);
    });
};
