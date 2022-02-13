"use strict";
require("../models/procedimento.model");
const mongoose = require("mongoose");
const Procedimento = mongoose.model("Procedimento");

//FUNÇÃO POST
exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Procedimento.create(data);

    await newObject.populate("ubs atividade detalhe").execPopulate();

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO GET
exports.get = async (req, res, next) => {
  try {
    var data = await Procedimento.find().populate("ubs atividade detalhe");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getEnviadoFalse = async (req, res, next) => {
  try {
    var data = await Procedimento.find({ enviado: false }).populate(
      "ubs atividade detalhe"
    );

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Procedimento.findById(id).populate(
      "ubs atividade detalhe"
    );

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getUbsProc = async (req, res, next) => {
  const { ubs } = req.params;

  try {
    var data = await Procedimento.find({
      ubs: ubs,
    }).populate("ubs atividade detalhe");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateProcedimento = await Procedimento.findByIdAndUpdate(
      id,
      bodyData,
      {
        new: true,
      }
    );

    return res.status(200).json(updateProcedimento);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteProcedimento = await Procedimento.findByIdAndDelete(id);
    return res.status(200).json(deleteProcedimento);
  } catch (e) {
    return res.status(400).json(e);
  }
};
