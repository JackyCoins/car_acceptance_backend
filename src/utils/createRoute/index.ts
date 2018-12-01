/**
 * @module createRoute
 * */

//region Import libraries
import { Context } from 'koa';
import { Model } from 'mongoose';
//endregion

//region Import utils
const logger = require('../logger');
//endregion

//region Handlers
const handleGetList = (Model: Model<any>) => async (ctx: Context) => {
  const items = await Model.find();
  ctx.body = { results: items };
};

const handleGetItem = (Model: Model<any>) => async (ctx: Context) => {
  try {
    ctx.body = await Model.findById(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    logger.error(error);
    ctx.status = 404;
  }
};

const handlePostItem = (Model: Model<any>) => async (ctx: Context) => {
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

const handleDeleteItem = (Model: Model<any>) => async (ctx: Context) => {
  try {
    ctx.body = await Model.remove({ _id: ctx.params.id });
  } catch (error) {
    logger.error(error);
    ctx.body = error;
  }
};

const handlePutItem = (Model: Model<any>) => async (ctx: Context) => {
  try {
    const item = await Model.findById(ctx.params.id);

    const updatedItem = Object.assign(item, ctx.request.body);

    ctx.body = await updatedItem.save();
    ctx.status = 200;
  } catch (error) {
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
const createRoute = (type = 'get', Model: Model<any>) => {
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
