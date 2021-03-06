/**
 * @module orders
 * */

//region Import types
import Router = require('koa-router');
//endregion

//region Import models
const createRoute = require('../../utils/createRoute/index');
//endregion

//region Import models
const Order = require('../../mongoose/order');
//endregion

//region initializeOrdersRoutes
/**
 * @function initializeOrdersRoutes
 *
 * @param {object} router
 * */
const initializeOrdersRoutes = (router: Router) => {
  router
    .get('/api/orders/', createRoute('getList', Order))
    .post('/api/orders/', createRoute('postItem', Order))
    .get('/api/orders/:id', createRoute('getItem', Order))
    .delete('/api/orders/:id', createRoute('deleteItem', Order))
    .put('/api/orders/:id', createRoute('updateItem', Order));
};
//endregion

//region Export
module.exports = initializeOrdersRoutes;
//endregion
