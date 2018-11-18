/**
 * @module createRoute
 * */

//region Import utils
  const logger = require('../logger');
  //endregion

//region Handlers
const handleGetList = Model => async ctx => {
  const items = await Model.find();
  ctx.body = { results: items };
};

const handleGetItem = Model => async ctx => {
  try {
    ctx.body = await Model.findById(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    logger.error(error);
    ctx.status = 404;
  }
};

const handlePostItem = Model => async ctx => {
  const item = new Model(ctx.request.body);

  try {
    ctx.body = await item.save();
    ctx.status = 200;
  } catch (error) {
    logger.error(error);
    ctx.body = error;
    ctx.status = 400;
  }
};

const handleDeleteItem = Model => async ctx => {
  try {
    ctx.body = await Model.remove({ _id: ctx.params.id });
  } catch (error) {
    logger.error(error);
    ctx.body = error;
  }
};

const handlePutItem = Model => async ctx => {
  try {
    const item = await Model.findById(ctx.params.id)

    const updatedItem = Object.assign(item, ctx.request.body);

    ctx.body = await updatedItem.save();
    ctx.status = 200;
  } catch(error) {
    logger.error(error);
    ctx.body = error;
  }
};
//endregion

//region createRoute
  /**
   * @function createRoute
   * @description Create route(get, post, etc.)
   * */
const createRoute = (type = 'get', Model) => {
  switch (type) {
    case 'getList': {
      return handleGetList(Model);
    }
    case 'getItem': {
      return handleGetItem(Model);
    }
    case 'postItem': {
      return handlePostItem(Model);
    }
    case 'deleteItem': {
      return handleDeleteItem(Model);
    }
    case 'updateItem': {
      return handlePutItem(Model);
    }
    default: {
      return handleGetList(Model);
    }
  }
};
//endregion

//region Export
module.exports = createRoute;
//endregion