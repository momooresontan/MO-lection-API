const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidateModel");

exports.getAllCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find();
});
