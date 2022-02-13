const express = require("express");
const router = express.Router();
const ubs = require("../controllers/Ubs.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", ubs.get);
//router.post("", jwtHelper.verifyJwtToken, ubs.post);
router.post("", jwtHelper.verifyJwtToken, ubs.post);
router.get("/:id", ubs.getById);
router.put("/:id", jwtHelper.verifyJwtToken, ubs.put);
router.delete("/:id", jwtHelper.verifyJwtToken, ubs.delete);

module.exports = router;
