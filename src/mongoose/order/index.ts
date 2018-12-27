//region Import libraries
const mongoose = require('mongoose');
import config = require('config');
//endregion

//region Import types
import { StatusOfOrder } from 'commonTypes';
//endregion

//region Import default data
import defaultData from './defaultData';
//endregion

//region Import plugins
const { getAutoIncrementPlugin } = require('..');
//endregion

//region statusesOfOrder
const statusesOfOrder: Array<StatusOfOrder> = config.get('Customer.statusesOfOrder');
//endregion

//region Validators
const validateDate = (value: Date) => value.valueOf() <= new Date().valueOf();
const validateStatus = (value: number): boolean =>
  !!statusesOfOrder.some((status: StatusOfOrder): boolean => status.id === value);
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
      default: defaultData.defaultEquipment,
    },
    damage: {
      type: Array,
      required: true,
      default: defaultData.defaultDamage,
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
