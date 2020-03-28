const connection = require('../database/connection')
module.exports = {
    async create(request, response){
        const { id } = request.body // Busca o ID através do corpo da requisição (ID informado no login)

        const ong = await connection('ongs') //Acessa a tabela ongs no DB
            .where('id', id) // Onde o ID passado pelo body for igual ao ID na tabela
            .select('name') // Seleciona o nome
            .first(); // Retorna um único resultado

            if (!ong) { // Negação de ONG - Se a ONG/ID não existir
                return response.status(400).json({ error: ' Nenhuma ONG encontrada coom este ID.'})
            }

         return response.json(ong);
    },

}