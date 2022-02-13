"use strict";
require("../models/DataServidor.model");
const mongoose = require("mongoose");
const Obj = mongoose.model("DataServidor");

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
