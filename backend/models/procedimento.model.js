const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  ubs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ubs",
  },
  enviado: {
    type: Boolean,
    default: false,
  },
  atividade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Atividade",
  },
  detalhe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Detalhe",
    },
  ],
});

module.exports = mongoose.model("Procedimento", Schema);
