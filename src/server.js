//region Import libraries
const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
//endregion

//region Import logger
const logger = require('./logger');
//endregion

//region Import middleware
const middleware = require('./middleware');
//endregion

//region Import api
const api = require('./api');
//endregion

//region Create the app
const app = new Koa();
//endregion

const router = new Router();

const apiConfig = config.get('Customer.apiConfig');

router.get('/', async ctx => {
  ctx.body = 'Car acceptance backend'
});

router.get('/api/orders/', api.orders.getOrders);

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
