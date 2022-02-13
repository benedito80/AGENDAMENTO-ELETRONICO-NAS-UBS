const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  cpf: {
    type: String,
  },
  nome: {
    type: String,
    // required: true,
  },
  rg: {
    type: String,
  },
  cns: {
    type: String,
  },
  sexo: {
    type: String,
    //  required: true,
  },
  data_nasc: {
    type: String,
    // required: true,
  },
  idade: {
    type: String,
    // required: true,
  },
  n_celular: {
    type: String,
    //  required: true,
  },
  cep: {
    type: String,
  },
  logradouro: {
    type: String,
    //  required: true,
  },
  numero: {
    type: Number,
  },
  bairro: {
    type: String,
    //  required: true,
  },
  uf: {
    type: String,
    //  required: true,
  },
  cidade: {
    type: String,
    //   required: true,
  },
  ubs: {
    type: String,
    //   required: true,
  },
  atividade: {
    type: String,
    //   required: true,
  },
  detalhe: {
    type: String,
    //   required: true,
  },
  dia: {
    type: String,
    //   required: true,
  },
  horas: {
    type: String,
    //   required: true,
  },
  prioridade: {
    type: String,
    //   required: true,
  },
  categoria: {
    type: String,
    //   required: true,
  },
  validado: {
    type: Boolean,
    default: false,
  },
  atendido: {
    type: Boolean,
    default: false,
  },
  descartado: {
    type: Boolean,
    default: false,
  },
  termos: {
    type: Boolean,
    //required: true,
  },
});
module.exports = mongoose.model("Usuario", Schema);
