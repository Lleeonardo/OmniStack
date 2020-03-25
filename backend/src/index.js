const express = require('express');
const routes = require('./routes'); //importando rotas do arquivo routes
const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json()); //converter json em objeto js

app.use(routes);

// Rota conjunto completo(url), recurso o que vem após a barra -> Rota / Recurso
/**
 * Metodos Http
 * Get: buscar informação no back    put: alterar informação no back
 * Post: criar informação no back    delete: deletar informação no back
 */

 /**
  * Tipos de parametros:
  * Query params: parametros enviados na rota(parametros nomeadoas) após "?", usado para filtros,paginação... /users?nome=marcel
  * Route params: parametros usados para  identificar recursos /users/id
  * 
  * Request Body:  Criar ou alterar recursos
  */

  /**
   * Query builder: table('tal').selecet('*').where();
   */

app.listen(3333);