//region Import libraries
const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
const bodyParser = require('koa-body');
//endregion

//region Import connectToMongo
const { connectToMongo } = require('./mongoose');
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
const apiConfig = config.get('Customer.apiConfig');

connectToMongo();
initializeRoutes(router);

//region Set middlewares
app.use(bodyParser());

app.use(middleware.errorHandler);

app.use(middleware.logTimeHandler);

app.use(router.routes()).use(router.allowedMethods());
//endregion

//region Create server
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
//endregion

//region Export
module.exports = server;
//endregion
