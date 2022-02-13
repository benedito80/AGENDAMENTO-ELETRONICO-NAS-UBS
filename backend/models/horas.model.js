const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  hr: {
    type: String,
  },
  enviado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Horas", Schema);
