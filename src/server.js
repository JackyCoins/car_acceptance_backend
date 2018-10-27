//region Import libraries
const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
//endregion

//region Import logger
const logger = require('./utils/logger');
//endregion

//region Import middleware
const middleware = require('./middleware');
//endregion

//region Import api
const initializeRoutes = require('./routes');
//endregion

//region Create the app
const app = new Koa();
//endregion

const router = new Router();

initializeRoutes(router);

const apiConfig = config.get('Customer.apiConfig');

app.use(middleware.errorHandler);

app.use(middleware.logTimeHandler);

app.use(router.routes()).use(router.allowedMethods());

let server;

try {
  if (!server) {
    server = app.listen(apiConfig.port, () =>
      logger.info(`The app has started on port ${apiConfig.port}`)
    );
  }
} catch (error) {
  logger.error(error);
}

//region Export
module.exports = server;
//endregion
