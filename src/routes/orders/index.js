//region Import models
const Order = require('../../mongoose/order');
//endregion

//region Handlers
/**
 * @function getOrders
 * @private
 *
 * @param {object} ctx
 * */
const getOrders = async ctx => {
  const orders = await Order.find();
  ctx.body = { results: orders };
};
//endregion

//region initializeOrdersRoutes
/**
 * @function initializeOrdersRoutes
 *
 * @param {object} router
 * */
const initializeOrdersRoutes = router => {
  router.get('/api/orders/', getOrders);
};
//endregion

//region Export
module.exports = initializeOrdersRoutes;
//endregion