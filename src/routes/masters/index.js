/**
 * @module masters
 * */

//region Import models
const Master = require('../../mongoose/master');
//endregion

//region Handlers
/**
 * @function getMasters
 * @private
 *
 * @param {object} ctx
 * */
const getMasters = async ctx => {
  const masters = await Master.find();
  ctx.body = { results: masters };
};

/**
 * @function postMaster
 * @private
 *
 * @param {object} ctx
 * */
const postMaster = async ctx => {
  const master = new Master(ctx.request.body);

  master.save((err, master) => {
    if (err) {
      ctx.body = err;
    } else {
      ctx.body = master;
    }
  });
};

/**
 * @function getMaster
 * @private
 *
 * @param {object} ctx
 * */
const getMaster = async ctx => {
  Master.findById(ctx.params.id, (err, master) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = master;
  });
};

/**
 * @function deleteMaster
 * @private
 *
 * @param {object} ctx
 * */
const deleteMaster = async ctx => {
  Master.remove({ _id: ctx.params.id }, (err, master) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = master;
  });
};

/**
 * @function updateMaster
 * @private
 *
 * @param {object} ctx
 * */
const updateMaster = async ctx => {
  Master.findById(ctx.params.id, (err, master) => {
    if (err) {
      ctx.body = err;
    }

    Object.assign(master, ctx.body).save((err, master) => {
      if (err) {
        ctx.body = err;
      } else {
        ctx.body = master;
      }
    });
  });
};
//endregion

//region initializeMastersRoutes
/**
 * @function initializeMastersRoutes
 *
 * @param {object} router
 * */
const initializeMastersRoutes = router => {
  router
    .get('/api/masters/', getMasters)
    .post('/api/masters/', postMaster)
    .get('/api/masters/:id', getMaster)
    .delete('/api/masters/:id', deleteMaster)
    .put('/api/masters/:id', updateMaster);
};
//endregion

//region Export
module.exports = initializeMastersRoutes;
//endregion
