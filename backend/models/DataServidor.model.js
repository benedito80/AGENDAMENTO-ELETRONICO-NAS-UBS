const { now } = require("lodash");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  data: {
    type: Date,
    default: Date,
  },
});

module.exports = mongoose.model("DataServidor", Schema);
