//region Import libraries
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
//endregion

//region Import logger
const logger = require('../utils/logger');
//endregion

autoIncrement.initialize(mongoose.connection);

//region connectToMongo
const connectToMongo = () => {
  mongoose.connect("mongodb://mongo:27017");

  const db = mongoose.connection;

  db.on("error", () => {
    logger.error("---FAILED to connect to mongoose");
  });

  db.once("open", () => {
    logger.info("+++Connected to mongoose");
  });
};
//endregion

//region getAutoIncrementPlugin
const getAutoIncrementPlugin = () => autoIncrement;
//endregion

//region Export
module.exports = {
  getAutoIncrementPlugin,
  connectToMongo
};
//endregion