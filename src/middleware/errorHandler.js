/**
 * @module errorHandler
 * */

//region errorHandler
/**
 * @function errorHandler
 * */
const errorHandler = async (ctx, next) => {
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