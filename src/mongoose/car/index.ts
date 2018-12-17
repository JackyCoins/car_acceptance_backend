//region Import types
import { Schema, model } from 'mongoose';
//endregion

//region Import libraries
const mongoose = require('mongoose');
//endregion

//region Import plugins
const { getAutoIncrementPlugin } = require('..');
//endregion

//region carSchema
const carSchema: Schema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    VIN: {
      type: String,
      required: true,
      unique: true,
    },
    brand: String,
    model: String,
    enginePower: String,
    engineType: String,
    engineCapacity: String,
    transmission: String,
  },
  { timestamps: true, collection: 'cars' }
);

carSchema.plugin(getAutoIncrementPlugin().plugin, {
  model: 'Car',
  field: 'carId',
});
//endregion

//region Car
const Car = mongoose.model('Car', carSchema);
//endregion

//region Export
module.exports = Car;
//endregion
