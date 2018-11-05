//region Import libraries
const mongoose = require('mongoose');
const config = require('config');
//endregion

//region Import default data
const { defaultEquipment, defaultDamage } = require('./defaultData');
//endregion

//region Import plugins
const { getAutoIncrementPlugin } = require('../index');
//endregion

//region statusesOfOrder
const statusesOfOrder = config.get('Consumer.statusesOfOrder');
//endregion

//region Validators
const validateDate = value => value.valueOf() <= new Date().valueOf();
const validateStatus = value => !!statusesOfOrder.some(status => status.id === value);
//endregion

//region orderSchema
const orderSchema = new mongoose.Schema(
  {
    created: {
      type: Date,
      default: new Date(),
      required: true,
      validate: validateDate,
    },
    clientId: {
      type: Number,
      required: true,
    },
    carId: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
      validate: validateStatus,
    },
    masterId: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    equipment: {
      type: Array,
      required: true,
      default: defaultEquipment,
    },
    damage: {
      type: Array,
      required: true,
      default: defaultDamage,
    },
    comment: {
      type: String,
      default: '',
    },
    stocks: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true, collection: 'orders' }
);

orderSchema.plugin(getAutoIncrementPlugin().plugin, {
  model: 'Order',
  field: 'orderId',
});
//endregion

//region Order
const Order = mongoose.model('Order', orderSchema);
//endregion

//region Export
module.exports = Order;
//endregion
