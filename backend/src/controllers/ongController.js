const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req,res){

        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    async create(req, res){

        //const params = req.query; Exemplo de Query params
        //const params = req.params; Exemplo de Route params
        const {name, email, whatsapp, city, uf} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ONGS').insert({id, name, email, whatsapp, city, uf,});
        return res.json({ id });
    }
};