//region Import handlers
const initializeOrdersRoutes = require('./orders');
const initializeMastersRoutes = require('./masters');
//endregion

//region initializeRoutes
const initializeRoutes = router => {
  router.get('/', async ctx => {
    ctx.body = 'Car acceptance backend'
  });

  initializeOrdersRoutes(router);
  initializeMastersRoutes(router);
};
//endregion

//region Export
module.exports = initializeRoutes;
//endregion