/**
 * @module clients
 * */

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

  client.save((err, client) => {
    if (err) {
      ctx.body = err;
    } else {
      ctx.body = client;
    }
  });
};

/**
 * @function getClient
 * @private
 *
 * @param {object} ctx
 * */
const getClient = async ctx => {
  Client.findById(ctx.params.id, (err, client) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = client;
  });
};

/**
 * @function deleteClient
 * @private
 *
 * @param {object} ctx
 * */
const deleteClient = async ctx => {
  Client.remove({ _id: ctx.params.id }, (err, client) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = client;
  });
};

/**
 * @function updateClient
 * @private
 *
 * @param {object} ctx
 * */
const updateClient = async ctx => {
  Client.findById(ctx.params.id, (err, client) => {
    if (err) {
      ctx.body = err;
    }

    Object.assign(client, ctx.body).save((err, client) => {
      if (err) {
        ctx.body = err;
      } else {
        ctx.body = client;
      }
    });
  });
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