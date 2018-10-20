//region Import libraries
const Koa = require('koa');
//endregion

//region Import logger
const logger = require('./logger');
//endregion

//region Import api
const api = require('./api');
//endregion

//region Create the app
const app = new Koa();
//endregion

app.use(api.orders.getOrders);

app.listen(8080);

app.on('error', err => {
  logger.error(err);
});

logger.info('The app has started on port 8080');