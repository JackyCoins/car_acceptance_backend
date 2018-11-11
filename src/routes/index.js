//region Import handlers
const initializeOrdersRoutes = require('./orders');
const initializeMastersRoutes = require('./masters');
const initializeClientsRoutes = require('./clients');
const initializeCarRoutes = require('./cars');
//endregion

//region initializeRoutes
const initializeRoutes = router => {
  router.get('/', async ctx => {
    ctx.body = 'Car acceptance backend'
  });

  initializeOrdersRoutes(router);
  initializeMastersRoutes(router);
  initializeClientsRoutes(router);
  initializeCarRoutes(router);
};
//endregion

//region Export
module.exports = initializeRoutes;
//endregion