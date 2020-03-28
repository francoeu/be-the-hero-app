
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs') // referencia o ID da tabela ONGS na coluna ONG_ID da tabela INCIDENTS para relacionar a ong que cadastrou o Incident.
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
