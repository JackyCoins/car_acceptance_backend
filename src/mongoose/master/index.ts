//region Import libraries
import { Schema, model } from 'mongoose';
//endregion

//region Import plugins
const { getAutoIncrementPlugin } = require('../index');
//endregion

//region masterSchema
const masterSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    patrName: String,
  },
  { timestamps: true, collection: 'masters' }
);

masterSchema.plugin(getAutoIncrementPlugin().plugin, {
  model: 'Master',
  field: 'masterId',
});
//endregion

//region Master
const Master = model('Master', masterSchema);
//endregion

//region Export
module.exports = Master;
//endregion
