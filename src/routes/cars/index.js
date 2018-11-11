/**
 * @module cars
 * */

//region Import models
const Car = require('../../mongoose/car');
//endregion

//region Handlers
/**
 * @function getCars
 * @private
 *
 * @param {object} ctx
 * */
const getCars = async ctx => {
  const cars = await Car.find();
  ctx.body = { results: cars };
};

/**
 * @function postCar
 * @private
 *
 * @param {object} ctx
 * */
const postCar = async ctx => {
  const car = new Car(ctx.request.body);

  car.save((err, car) => {
    if (err) {
      ctx.body = err;
    } else {
      ctx.body = car;
    }
  });
};

/**
 * @function getCar
 * @private
 *
 * @param {object} ctx
 * */
const getCar = async ctx => {
  Car.findById(ctx.params.id, (err, car) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = car;
  });
};

/**
 * @function deleteCar
 * @private
 *
 * @param {object} ctx
 * */
const deleteCar = async ctx => {
  Car.remove({ _id: ctx.params.id }, (err, car) => {
    if (err) {
      ctx.body = err;
    }

    ctx.body = car;
  });
};

/**
 * @function updateCar
 * @private
 *
 * @param {object} ctx
 * */
const updateCar = async ctx => {
  Car.findById(ctx.params.id, (err, car) => {
    if (err) {
      ctx.body = err;
    }

    Object.assign(car, ctx.request.body).save((err, car) => {
      if (err) {
        ctx.body = err;
      } else {
        ctx.body = car;
      }
    });
  });
};
//endregion

//region initializeCarsRoutes
/**
 * @function initializeCarsRoutes
 *
 * @param {object} router
 * */
const initializeCarsRoutes = router => {
  router
    .get('/api/cars/', getCars)
    .post('/api/cars/', postCar)
    .get('/api/cars/:id', getCar)
    .delete('/api/cars/:id', deleteCar)
    .put('/api/cars/:id', updateCar);
};
//endregion

//region Export
module.exports = initializeCarsRoutes;
//endregion