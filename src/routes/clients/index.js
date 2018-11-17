/**
 * @module clients
 * */

//region Import utils
const logger = require('../../utils/logger');
//endregion

//region Import models
const Client = require('../../mongoose/client');
//endregion

//region Handlers
/**
 * @function getClients
 * @private
 *
 * @param {object} ctx
 * */
const getClients = async ctx => {
  const clients = await Client.find();
  ctx.body = { results: clients };
};

/**
 * @function postClient
 * @private
 *
 * @param {object} ctx
 * */
const postClient = async ctx => {
  const client = new Client(ctx.request.body);

  try {
    ctx.body = await client.save();
    ctx.status = 200;
  } catch (error) {
    logger.error(error);
    ctx.body = error;
    ctx.status = 400;
  }
};

/**
 * @function getClient
 * @private
 *
 * @param {object} ctx
 * */
const getClient = async ctx => {
  try {
    ctx.body = await Client.findById(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    logger.error(error);
    ctx.status = 404;
  }
};

/**
 * @function deleteClient
 * @private
 *
 * @param {object} ctx
 * */
const deleteClient = async ctx => {
  try {
    ctx.body = await Client.remove({ _id: ctx.params.id });
  } catch (error) {
    logger.error(error);
    ctx.body = error;
  }
};

/**
 * @function updateClient
 * @private
 *
 * @param {object} ctx
 * */
const updateClient = async ctx => {
  try {
    const client = await Client.findById(ctx.params.id)

    const updatedClient = Object.assign(client, ctx.request.body);

    ctx.body = await updatedClient.save();
    ctx.status = 200;
  } catch(error) {
    logger.error(error);
    ctx.body = error;
  }
};
//endregion

//region initializeClientsRoutes
/**
 * @function initializeClientsRoutes
 *
 * @param {object} router
 * */
const initializeClientsRoutes = router => {
  router
    .get('/api/clients/', getClients)
    .post('/api/clients/', postClient)
    .get('/api/clients/:id', getClient)
    .delete('/api/clients/:id', deleteClient)
    .put('/api/clients/:id', updateClient);
};
//endregion

//region Export
module.exports = initializeClientsRoutes;
//endregion