const express = require("express");

const router = express.Router();

router.post("/register");

router.post("/login");

router.post("/vote");

module.exports = router;
