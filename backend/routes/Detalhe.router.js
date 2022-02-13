const express = require("express");
const router = express.Router();
const detalhe = require("../controllers/Detalhe.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", detalhe.get);
router.get("/enviado-false", detalhe.getEnviadoFalse);
router.post("", jwtHelper.verifyJwtToken, detalhe.post);
router.get("/:id", detalhe.getById);
router.put("/:id", jwtHelper.verifyJwtToken, detalhe.put);
router.delete("/:id", jwtHelper.verifyJwtToken, detalhe.delete);

module.exports = router;
