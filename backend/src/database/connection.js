const knex = require('knex')
const configuration = require('../../knexfile') // atribuindo os dados do knexfile a variável

const connection = knex(configuration.development) // atribuindo as configurações de conxão com o banco de dados de desenvolvimento

module.exports = connection; // exportando as configurações de conexão com o db para ser utilizado em qualquer parte da aplicação que precise se conectar ao db.