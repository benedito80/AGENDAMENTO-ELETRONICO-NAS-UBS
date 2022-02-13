"use strict";
require("../models/Usuario.model");
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

//FUNÇÃO POST
exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Usuario.create(data);

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    var data = await Usuario.find();

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO GET
exports.getValidadoFalse = async (req, res, next) => {
  try {
    var data = await Usuario.find({
      validado: false,
      descartado: false,
      atendido: false,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//AQUI
exports.getValidadoTrue = async (req, res, next) => {
  try {
    var data = await Usuario.find({
      validado: true,
      descartado: false,
      atendido: false,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAtendidoTrue = async (req, res, next) => {
  try {
    var data = await Usuario.find({
      atendido: true,
      validado: true,
      descartado: false,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAtendidoFalse = async (req, res, next) => {
  try {
    var data = await Usuario.find({
      atendido: false,
      validado: true,
      descartado: false,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getValidadoDescartado = async (req, res, next) => {
  try {
    var data = await Usuario.find({ validado: true, descartado: true });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Usuario.findById(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getByCpf = async (req, res, next) => {
  const { cpf } = req.params;

  try {
    var data = await Usuario.find({ cpf: cpf, atendido: true });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getByCpfDns = async (req, res, next) => {
  const { cpf } = req.params;
  const { data_nasc } = req.params;

  try {
    var data = await Usuario.find({ cpf: cpf, data_nasc: data_nasc });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getUbsDetalheSupFalse = async (req, res, next) => {
  const { ubs } = req.params;
  const { detalhe } = req.params;

  try {
    var data = await Usuario.find({
      validado: false,
      descartado: false,
      atendido: false,
      ubs: ubs,
      detalhe: detalhe,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getUbsDetalheProfFalse = async (req, res, next) => {
  const { ubs } = req.params;
  const { detalhe } = req.params;

  try {
    var data = await Usuario.find({
      validado: true,
      descartado: false,
      atendido: false,
      ubs: ubs,
      detalhe: detalhe,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getUbsDetalheSupTrue = async (req, res, next) => {
  const { ubs } = req.params;
  const { detalhe } = req.params;

  try {
    var data = await Usuario.find({
      validado: true,
      descartado: false,
      atendido: false,
      ubs: ubs,
      detalhe: detalhe,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};


exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateUsuario = await Usuario.findByIdAndUpdate(id, bodyData, {
      new: true,
    });

    return res.status(200).json(updateUsuario);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteUsuario = await Usuario.findByIdAndDelete(id);
    return res.status(200).json(deleteUsuario);
  } catch (e) {
    return res.status(400).json(e);
  }
};
