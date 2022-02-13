"use strict";
require("../models/horas.model");
const mongoose = require("mongoose");
const Vacina = mongoose.model("Horas");

//FUNÇÃO POST
exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Vacina.create(data);

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO GET
exports.get = async (req, res, next) => {
  try {
    var data = await Vacina.find().sort({ hr: 1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getEnviadoFalse = async (req, res, next) => {
  try {
    var data = await Vacina.find({ enviado: false }).sort({ hr: 1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Vacina.findById(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateVacina = await Vacina.findByIdAndUpdate(id, bodyData, {
      new: true,
    });

    return res.status(200).json(updateVacina);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteVacina = await Vacina.findByIdAndDelete(id);
    return res.status(200).json(deleteVacina);
  } catch (e) {
    return res.status(400).json(e);
  }
};
