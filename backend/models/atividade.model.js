const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  atividade: {
    type: String,
  },
});

module.exports = mongoose.model("Atividade", Schema);
