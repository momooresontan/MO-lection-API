const express = require("express");
const { getMe, login, register } = require("../controllers/voterController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me/:id", getMe);

module.exports = router;
