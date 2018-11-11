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

/**
 * @function postOrder
 * @private
 *
 * @param {object} ctx
 * */
const postOrder = async ctx => {
  const order = new Order(ctx.request.body);

  order.save((err, order) => {
    if (err) {
      ctx.body = err;
    } else {
      ctx.body = order;
    }
  });
};

/**
 * @function getOrder
 * @private
 *
 * @param {object} ctx
 * */
const getOrder = async ctx => {
  Order.findById(ctx.params.id, (err, order) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = order;
  });
};

/**
 * @function deleteOrder
 * @private
 *
 * @param {object} ctx
 * */
const deleteOrder = async ctx => {
  Order.remove({ _id: ctx.params.id }, (err, order) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = order;
  });
};

/**
 * @function updateOrder
 * @private
 *
 * @param {object} ctx
 * */
const updateOrder = async ctx => {
  Order.findById(ctx.params.id, (err, order) => {
    if (err) {
      ctx.body = err;
    }

    Object.assign(order, ctx.body).save((err, order) => {
      if (err) {
        ctx.body = err;
      } else {
        ctx.body = order;
      }
    });
  });
};
//endregion

//region initializeOrdersRoutes
/**
 * @function initializeOrdersRoutes
 *
 * @param {object} router
 * */
const initializeOrdersRoutes = router => {
  router
    .get('/api/orders/', getOrders)
    .post('/api/orders/', postOrder)
    .get('/api/orders/:id', getOrder)
    .delete('/api/orders/:id', deleteOrder)
    .put('/api/orders/:id', updateOrder);
};
//endregion

//region Export
module.exports = initializeOrdersRoutes;
//endregion
