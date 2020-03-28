const connection = require('../database/connection')
module.exports = {
    async index(request, response){
        const { page = 1 } = request.query // Busca o parâmetro PAGE dentro dos query params da requisição e caso não exista, utiliza o valor 1 como padrão. (Para buscar os dados da página 1)

        const [count] = await connection('actions').count() // consta todos os campos da tabela e retorna o número total de registros

        console.log(count)

        const actions = await connection('actions')
         .join('orgs', 'orgs.id', '=', 'actions.org_id') //Join é utilizado para relacionar dados de duas tabelas. Aqui ele traz dados da tabela de Ongs para a listagem de casos criados pela prória ong.
         .limit(5) // Limita o retorno de registros para 5 por página
         .offset( (page - 1) * 5) // Cálculo para pular de 5 em 5 registros (Sendo que na pg 1 o cálculo retorna os mesmos 5 do limite e multiplica page * 5 para exibir os demais pulando os 5 anteriores)
         .select([
             'actions.*', 
             'orgs.name', 
             'orgs.email', 
             'orgs.whatsapp', 
             'orgs.city', 
             'orgs.uf'
            ]); // Seleciona todos os dados dos CASOS e somente os dados especificados das ONGS

        response.header('X-Total-Count', count['count(*)']) // Retorna o total de registros na tabela através do Header da resposta para ser acessado pelo frontend
        return response.json(actions);
    },
    async create(request, response){
        const { title, description, value } = request.body;
        const org_id = request.headers.authorization; // O ID da ORG é passado e obtido através do Header, ao invés do BODY que fica visível para todos. E não queremos deixar o ID disponível para qualquer um acessar.

       const [id] = await connection('actions').insert({
            title,
            description,
            value, 
            org_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const org_id = request.headers.authorization;

        const action = await connection('actions')
            .where('id', id) // Quando encontrar o ID igual da requisição na tabela actions
            .select('org_id') // seleciona o ID da ong
            .first(); // Pega o primeiro resultado verdadeiro que retornar

            if (action.org_id != org_id ){ // Se o ID da ong dentro da tabela for diferente do ID da ORG atual/conectada que está fazendo a requisição
            return response.status(401).json({ error: 'Operação não permitida.' }) // retorna status de operação não autorizada. Uma ONG só pode deletar algo criado por ela mesma.
            }

            await connection('actions').where('id', id).delete(); // Caso a verificação IF for falsa, ou seja, o ID da ONG é o mesmo na tabela do caso a ser deletado, então DELETE.

            return response.status(204).send(); // Status de sucesso enviado (Resposta de sucesso sem conteúdo
    }
};