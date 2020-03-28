
const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {

    async index ( request, response){ // Método para listagem de ONGS cadastradas
        const ongs = await connection('ongs').select('*') // Espera fazer conexão com DB e seleciona todos os dados na tabela ONGS

        return response.json(ongs) // Retorna um ARRAY com os dados pegos do DB no formato JSON
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body

        const id = crypto.randomBytes(4).toString('HEX'); // Utilizando o crypto para gerar um ID aleatório de 4 dígitos hexadecimal.
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
    
        return response.json({ id })  
    }
}