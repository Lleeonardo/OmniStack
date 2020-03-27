const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        
        const [ count ] = await connection('incidents').count('*');

        const { page = 1 } = req.query;
        //Essa relação tá errada, vamo arrumar logo menos
        const incidents = await connection('incidents')
                                .join('ONGS', 'ONGS.id', '=', 'incidents.ong_id')
                                .limit(5)
                                .offset((page -1)* 5)
                                .select(['incidents.*','ONGS.name','ONGS.email', 'ONGS.whatsapp', 'ONGS.city', 'ONGS.uf']);
        
        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);

    },

    async create(req, res){
        const {title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({title,description,value,ong_id,});

        return res.json({ id });
    },

    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
                                .where('id', id)
                                .select('ong_id')
                                .first();
                            
        if(incident.ong_id != ong_id){
            return res.status(401).json({ error: 'Sem permissão'});
        }
        
        await connection('incidents').where('id',id).delete();
        return res.status(204).send();

    }

};