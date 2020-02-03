
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reactions').insert([
        {id: 1, ticket_id: 3, notes: 'I re-created userId and sent an email to student for trial with new password. will wait for confirmation from the student.'},
        {id: 2, ticket_id: 1, notes: 'emailed to students with new registration information'},
        {id: 3, ticket_id: 3, notes: 'the student confirmed the userId is working now'}
      ]);
    });
};
