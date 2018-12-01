/**
 * @module cars
 * */

//region Import utils
const createRoute = require('../../utils/createRoute/index');
//endregion

//region Import models
const Car = require('../../mongoose/car');
//endregion

//region initializeCarsRoutes
/**
 * @function initializeCarsRoutes
 *
 * @param {object} router
 * */
const initializeCarsRoutes = router => {
  router
    .get('/api/cars/', createRoute('getList', Car))
    .post('/api/cars/', createRoute('postItem', Car))
    .get('/api/cars/:id', createRoute('getItem', Car))
    .delete('/api/cars/:id', createRoute('deleteItem', Car))
    .put('/api/cars/:id', createRoute('updateItem', Car));
};
//endregion

//region Export
module.exports = initializeCarsRoutes;
//endregion