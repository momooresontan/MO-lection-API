const express = require("express");
const {
  addCandidate,
  getAllCandidates,
  getCandidateById,
} = require("../controllers/candidateController");

const router = express.Router();

router.post("/", addCandidate);
router.get("/", getAllCandidates);

router.get("/:id", getCandidateById);

module.exports = router;
