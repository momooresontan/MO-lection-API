const express = require("express");
const { register } = require("../controllers/voterController");

const router = express.Router();

router.post("/register", register);

router.post("/login");

router.post("/vote");

module.exports = router;
