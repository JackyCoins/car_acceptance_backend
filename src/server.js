//region Import libraries
const Koa = require('koa');
const Router = require('koa-router');
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

router.get('/', api.orders.getOrders);

app.use(middleware.errorHandler);

app.use(middleware.logTimeHandler);

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => logger.info('The app has started on port 8080'));
