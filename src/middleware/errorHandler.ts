/**
 * @module errorHandler
 * */

//region Import types
  import { Logger } from 'winston';
  import { Context } from 'koa';
//endregion

//region Import utils
const logger: Logger = require('../utils/logger');
//endregion

//region errorHandler
/**
 * @function errorHandler
 * */
const errorHandler = async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);

    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message
    };
  }
};
//endregion

//region Export
module.exports = errorHandler;
//endregion