const express = require("express");
const router = express.Router();
const data = require("../controllers/DataServidor.controller");
const jwtHelper = require("../config/jwtHelper");

router.post("",  data.post);

module.exports = router;


