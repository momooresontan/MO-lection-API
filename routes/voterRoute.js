const express = require("express");
const { login, register } = require("../controllers/voterController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me");

module.exports = router;
