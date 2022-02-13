const express = require("express");
const router = express.Router();
const data = require("../controllers/Data.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", data.get);
//router.post("", jwtHelper.verifyJwtToken, data.post);
router.post("", jwtHelper.verifyJwtToken, data.post);
router.get("/enviado-false", data.getEnviadoFalse);
router.get("/:id", data.getById);
router.put("/:id", jwtHelper.verifyJwtToken, data.put);
router.delete("/:id", jwtHelper.verifyJwtToken, data.delete);

module.exports = router;
