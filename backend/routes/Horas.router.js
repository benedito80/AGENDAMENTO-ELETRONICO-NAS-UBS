const express = require("express");
const router = express.Router();
const horas = require("../controllers/Horas.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", horas.get);
router.get("/enviado-false", horas.getEnviadoFalse);
router.post("", jwtHelper.verifyJwtToken, horas.post);
router.get("/:id", horas.getById);
//router.put("/:id",  horas.put);
router.put("/:id", jwtHelper.verifyJwtToken, horas.put);
router.delete("/:id", jwtHelper.verifyJwtToken, horas.delete);

module.exports = router;
