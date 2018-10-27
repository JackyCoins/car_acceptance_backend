//region Handlers
/**
 * @function getOrders
 *
 * @param {object} ctx
 * */
const getOrders = async ctx => {
  ctx.body = 'Orders';
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