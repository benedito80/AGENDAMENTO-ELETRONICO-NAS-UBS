"use strict";
require("../models/detalhe.model");
const mongoose = require("mongoose");
const Detalhe = mongoose.model("Detalhe");

//FUNÇÃO POST
exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Detalhe.create(data);

    await newObject.populate("data").execPopulate();

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO GET
exports.get = async (req, res, next) => {
  try {
    var data = await Detalhe.find().populate("data");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getEnviadoFalse = async (req, res, next) => {
  try {
    var data = await Detalhe.find({ enviado: false }).populate("data");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Detalhe.findById(id).populate("data");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateDetalhe = await Detalhe.findByIdAndUpdate(id, bodyData, {
      new: true,
    });

    return res.status(200).json(updateDetalhe);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteDetalhe = await Detalhe.findByIdAndDelete(id);
    return res.status(200).json(deleteDetalhe);
  } catch (e) {
    return res.status(400).json(e);
  }
};
