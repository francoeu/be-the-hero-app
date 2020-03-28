const connection = require('../database/connection')
module.exports = {
    async index(request, response){
        const org_id = request.headers.authorization;

        const actions = await connection('actions')
            .where('org_id', org_id)
            .select('*')

         return response.json(actions);
    },

}