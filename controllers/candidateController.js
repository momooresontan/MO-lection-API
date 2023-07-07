const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Candidate = require("../models/candidateModel");

exports.getAllCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find();
  if (!candidates) {
    res.status(404);
    throw new Error("No candidate found");
  }
  res.status(200).json(candidates);
});

exports.addCandidate = asyncHandler(async (req, res) => {
  const { name, email, party, voters, votes_count } = req.body;
  if (!name || !email || !party) {
    res.status(400);
    throw new Error("All fields required");
  }
  const existingCandidate = await Candidate.findOne({ email });
  if (existingCandidate) {
    res.status(400);
    throw new Error("Candidate already exists");
  }
  const candidate = await Candidate.create({
    name,
    email,
    party,
    voters,
    votes_count,
  });

  res.status(201).json({ candidate });
});

exports.getCandidateById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const candidate = await Candidate.findById(id);
  if (!candidate) {
    res.status(404);
    throw new Error("Candidate not found");
  }
  const voteCount = candidate.voters.length;
  candidate.votes_count = voteCount;

  res.status(200).json({ candidate });
});
