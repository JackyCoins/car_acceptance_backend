/**
 * @module masters
 * */

//region Import types
import Router = require('koa-router');
//endregion

//region Import utils
const createRoute = require('../../utils/createRoute/index');
//endregion

//region Import models
const Master = require('../../mongoose/master/index');
//endregion

//region initializeMastersRoutes
/**
 * @function initializeMastersRoutes
 *
 * @param {object} router
 * */
const initializeMastersRoutes = (router: Router) => {
  router
    .get('/api/masters/', createRoute('getList', Master))
    .post('/api/masters/', createRoute('postItem', Master))
    .get('/api/masters/:id', createRoute('getItem', Master))
    .delete('/api/masters/:id', createRoute('deleteItem', Master))
    .put('/api/masters/:id', createRoute('updateItem', Master));
};
//endregion

//region Export
module.exports = initializeMastersRoutes;
//endregion
