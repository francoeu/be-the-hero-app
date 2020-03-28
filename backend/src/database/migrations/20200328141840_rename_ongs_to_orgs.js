
exports.up = function(knex) {
    return knex.schema.renameTable('ongs', 'orgs')
};

exports.down = function(knex) {
    return knex.schema.dropTable('orgs');
};
