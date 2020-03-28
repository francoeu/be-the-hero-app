
exports.up = function(knex) {
    return knex.schema.renameTable('incidents', 'actions')
};

exports.down = function(knex) {
    return knex.schema.dropTable('actions');
};
