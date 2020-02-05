exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl.enu('accessType', ['student']).defaultTo('student');
    })
    .createTable('helpers', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl.enu('accessType', ['helper', 'admin']).defaultTo('helper');
    })

    .createTable('tickets', tbl => {
      tbl.increments();
      tbl
        .string('title', 128)
        .notNullable()
        .index();
      tbl.string('description', 128);
      tbl
        .enu('ticketCategory', [
          'Equipment',
          'People',
          'Track',
          'Finances',
          'Other'
        ])
        .defaultTo(null);
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl.string('tried', 500);
      // ticket opened by user-id
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      tbl.boolean('resolved').defaultTo(false);
      // tickets assigned to helper, if not assigned, default to null
      tbl
        .integer('helper_id')
        .unsigned()
        .references('id')
        .inTable('helpers')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .defaultTo(null);
    })

    .createTable('reactions', tbl => {
      tbl.increments();
      tbl
        .integer('ticket_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tickets')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl.string('notes', 128);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reactions')
    .dropTableIfExists('tickets')
    .dropTableIfExists('helpers')
    .dropTableIfExists('users');
};
