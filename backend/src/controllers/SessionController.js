const connection = require('../database/connection')
module.exports = {
    async create(request, response){
        const { id } = request.body // Busca o ID através do corpo da requisição (ID informado no login)

        const org = await connection('orgs') //Acessa a tabela orgs no DB
            .where('id', id) // Onde o ID passado pelo body for igual ao ID na tabela
            .select('name') // Seleciona o nome
            .first(); // Retorna um único resultado

            if (!org) { // Negação de ONG - Se a ONG/ID não existir
                return response.status(400).json({ error: ' Nenhuma instituição encontrada coom este ID.'})
            }

         return response.json(org);
    },

}