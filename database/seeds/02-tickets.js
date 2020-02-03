
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        {id: 1, title: 'registration question', description: 'When is the next registration deadline?', ticketCategory: 'frontOffice', user_id: 3, helper_id: 2},
        {id: 2, title: 'progress report', description: 'my progress report is not updating since Jan. 2020', ticketCategory: 'technical', user_id: 2, helper_id: 1},
        {id: 3, title: 'Slack', description: 'My userid is not working in Slack', ticketCategory: 'technical', user_id: 3, helper_id: 3}
      ]);
    });
};
