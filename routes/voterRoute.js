const express = require("express");
const {
  addVote,
  getMe,
  login,
  register,
  removeVote,
} = require("../controllers/voterController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me/:id", getMe);

router.post("/vote", addVote);
router.delete("/vote/:id", removeVote);

module.exports = router;
