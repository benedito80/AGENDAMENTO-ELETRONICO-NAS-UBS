const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  ubs: {
    type: String,
  },
});

module.exports = mongoose.model("Ubs", Schema);
