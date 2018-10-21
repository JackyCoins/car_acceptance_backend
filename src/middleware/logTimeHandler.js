/**
 * @module logTimeHandler
 * */

//region Import logger
const logger = require('../logger');
//endregion

//region logTimeHandler
/**
 * @function logTimeHandler
 * */
const logTimeHandler = async (ctx, next) => {
  const start = new Date();

  await next();

  const ms = new Date() - start;
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
//endregion

//region Export
module.exports = logTimeHandler;
//endregion