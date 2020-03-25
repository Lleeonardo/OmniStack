const connection = require('../database/connection');

module.exports = {

    async create(req, res){
        const { id } = req.body;

        const ong = await connection('ONGS')
                            .where('id',id)
                            .select('name')
                            .first();

        if(!ong){
            return res.status(400).json({ error: 'No ong found this id'})
        }

        return res.json(ong);
    }
};