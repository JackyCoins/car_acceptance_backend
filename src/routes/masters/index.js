/**
 * @module masters
 * */

//region Handlers
/**
 * @function getMasters
 * @private
 *
 * @param {object} ctx
 * */
const getMasters = async ctx => {
  ctx.body = { results: [] };
};
//endregion

//region initializeMastersRoutes
/**
 * @function initializeMastersRoutes
 *
 * @param {object} router
 * */
const initializeMastersRoutes = router => {
  router.get('/api/masters/', getMasters);
};
//endregion

//region Export
module.exports = initializeMastersRoutes;
//endregion
