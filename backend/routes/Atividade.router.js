const express = require("express");
const router = express.Router();
const atividade = require("../controllers/Atividade.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", atividade.get);
//router.post("", jwtHelper.verifyJwtToken, atividade.post);
router.post("", jwtHelper.verifyJwtToken, atividade.post);
router.get("/:id", atividade.getById);
router.put("/:id", jwtHelper.verifyJwtToken, atividade.put);
router.delete("/:id", jwtHelper.verifyJwtToken, atividade.delete);

module.exports = router;
