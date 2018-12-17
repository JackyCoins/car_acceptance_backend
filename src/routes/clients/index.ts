/**
 * @module clients
 * */

//region Import types
import Router = require('koa-router');
//endregion

//region Import utils
const createRoute = require('../../utils/createRoute/index');
//endregion

//region Import models
const Client = require('../../mongoose/client');
//endregion

//region initializeClientsRoutes
/**
 * @function initializeClientsRoutes
 *
 * @param {object} router
 * */
const initializeClientsRoutes = (router: Router) => {
  router
    .get('/api/clients/', createRoute('getList', Client))
    .post('/api/clients/', createRoute('postItem', Client))
    .get('/api/clients/:id', createRoute('getItem', Client))
    .delete('/api/clients/:id', createRoute('deleteItem', Client))
    .put('/api/clients/:id', createRoute('updateItem', Client));
};
//endregion

//region Export
module.exports = initializeClientsRoutes;
//endregion