const express = require("express");
const router = express.Router();
const usuario = require("../controllers/Usuario.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", jwtHelper.verifyJwtToken, usuario.getValidadoFalse);
router.post("", jwtHelper.verifyJwtToken, usuario.post);
router.get("/validados", jwtHelper.verifyJwtToken, usuario.getValidadoTrue);
router.get("/atendidos/get/true", jwtHelper.verifyJwtToken, usuario.getAtendidoTrue);    
router.get("/atendidos/get/all/false", jwtHelper.verifyJwtToken, usuario.getAtendidoFalse);

router.get("/validados/descartados", jwtHelper.verifyJwtToken, usuario.getValidadoDescartado);
router.get("/:id", jwtHelper.verifyJwtToken, usuario.getById);
router.put("/:id", jwtHelper.verifyJwtToken, usuario.put);
router.delete("/:id", jwtHelper.verifyJwtToken, usuario.delete);
router.get("/cpf/:cpf", jwtHelper.verifyJwtToken, usuario.getByCpf);
router.get("/:cpf/:data_nasc", usuario.getByCpfDns);

router.get("/busca/sup-false/:ubs/:detalhe", jwtHelper.verifyJwtToken, usuario.getUbsDetalheSupFalse);
router.get("/busca/all/sup-true/:ubs/:detalhe", jwtHelper.verifyJwtToken, usuario.getUbsDetalheSupTrue);
router.get("/busca/prof/all/false/:ubs/:detalhe", jwtHelper.verifyJwtToken, usuario.getUbsDetalheProfFalse);

module.exports = router;
