const express = require("express");
const router = express.Router();
const procedimento = require("../controllers/Procedimento.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", procedimento.get);
router.post("", jwtHelper.verifyJwtToken, procedimento.post);
router.get("/enviado-false", procedimento.getEnviadoFalse);
router.get("/:id", procedimento.getById);
router.put("/:id", jwtHelper.verifyJwtToken, procedimento.put);
router.delete("/:id", jwtHelper.verifyJwtToken, procedimento.delete);
router.get("/ubs/:ubs", procedimento.getUbsProc);
//router.get("/:atividade/:ubs", procedimento.getUbsProc);

module.exports = router;
