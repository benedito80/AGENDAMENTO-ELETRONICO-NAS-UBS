const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  dia: {
    type: String,
  },
  controle: {
    type: String,
  },
  enviado: {
    type: Boolean,
    default: false,
  },
  horas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Horas",
    },
  ],
});

module.exports = mongoose.model("Data", Schema);
