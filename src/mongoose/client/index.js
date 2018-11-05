//region Import libraries
const mongoose = require('mongoose');
//endregion

//region Import plugins
const { getAutoIncrementPlugin } = require('../index');
//endregion

//region clientSchema
const clientSchema = new mongoose.Schema(
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
  { timestamps: true, collection: 'clients' }
);

clientSchema.plugin(getAutoIncrementPlugin().plugin, {
  model: 'Client',
  field: 'clientId',
});
//endregion

//region Client
const Client = mongoose.model('Client', clientSchema);
//endregion

//region Export
module.exports = Client;
//endregion
