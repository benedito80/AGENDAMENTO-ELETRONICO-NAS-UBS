const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  detalhe: {
    type: String,
  },
  controle: {
    type: String,
  },
  prioridade: {
    type: String,
  },
  categoria: {
    type: String,
  },
  enviado: {
    type: Boolean,
    default: false,
  },
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
  ],
});

module.exports = mongoose.model("Detalhe", Schema);
