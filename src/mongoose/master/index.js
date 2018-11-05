//region Import libraries
const mongoose = require('mongoose');
//endregion

//region Import plugins
const { getAutoIncrementPlugin } = require('../index');
//endregion

//region masterSchema
const masterSchema = new mongoose.Schema(
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
const Master = mongoose.model('Master', masterSchema);
//endregion

//region Export
module.exports = Master;
//endregion
