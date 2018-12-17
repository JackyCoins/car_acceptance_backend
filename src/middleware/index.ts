/**
 * @module middleware
 * */

//region Import handlers
const errorHandler = require('./errorHandler');
const logTimeHandler = require('./logTimeHandler');
//endregion

// @ts-ignore
const middleware = {
  errorHandler,
  logTimeHandler
};

//region Export
module.exports = middleware;
//endregion