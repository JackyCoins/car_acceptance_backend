//region Import handlers
const initializeOrdersRoutes = require('./orders');
//endregion

const initializeRoutes = router => {
  router.get('/', async ctx => {
    ctx.body = 'Car acceptance backend'
  });

  initializeOrdersRoutes(router);
};

//region Export
module.exports = initializeRoutes;
//endregion