"use strict";
require("../models/atividade.model");
const mongoose = require("mongoose");
const Obj = mongoose.model("Atividade");

//FUNÇÃO POST
exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Obj.create(data);

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO GET
exports.get = async (req, res, next) => {
  try {
    var data = await Obj.find();

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Obj.findById(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getByPosto = async (req, res, next) => {
  const { ubs } = req.params;

  try {
    var data = await Obj.find({ ubs: ubs });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getUbs = async (req, res, next) => {
  const { ubs } = req.params;
  const { vacina } = req.params;

  try {
    var data = await Obj.find({ ubs: ubs, vacina: vacina }).populate(
      "ubs vacina data"
    );

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};


exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateUbs = await Obj.findByIdAndUpdate(id, bodyData, {
      new: true,
    });

    return res.status(200).json(updateUbs);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//FUNÇÃO DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteUbs = await Obj.findByIdAndDelete(id);
    return res.status(200).json(deleteUbs);
  } catch (e) {
    return res.status(400).json(e);
  }
};
