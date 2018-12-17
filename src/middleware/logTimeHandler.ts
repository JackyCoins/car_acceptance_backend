/**
 * @module logTimeHandler
 * */

//region Import types
import { Logger } from 'winston';
import { Context } from 'koa';
//endregion

//region Import logger
const logger: Logger = require('../utils/logger');
//endregion

//region logTimeHandler
/**
 * @function logTimeHandler
 * */
const logTimeHandler = async (ctx: Context, next: Function) => {
  const start = new Date();

  await next();

  const currentDate: Date = new Date();

  const ms: number = currentDate.valueOf() - start.valueOf();
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
//endregion

//region Export
module.exports = logTimeHandler;
//endregion