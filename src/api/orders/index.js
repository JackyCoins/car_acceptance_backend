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

//region Export
module.exports = { getOrders };
//endregion