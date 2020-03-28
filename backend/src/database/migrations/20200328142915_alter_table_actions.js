
exports.up = function(knex) {
    return knex.schema.alterTable('actions', function(table){
      table.renameColumn('ong_id', 'org_id')
  
      table.foreign('org_id').references('id').inTable('orgs') // referencia o ID da tabela ORGS na coluna ORG_ID da tabela INCIDENTS para relacionar a ong que cadastrou o Incident.
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('actions')
  };
  