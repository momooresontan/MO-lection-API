const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Candidate = require("../models/candidateModel");
const Vote = require("../models/voteModel");
const Voter = require("../models/voterModel");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const existingVoter = await Voter.findOne({ email });
  if (existingVoter) {
    res.status(400).json({ message: "Voter already exists! Login instead" });
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const voter = await Voter.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  console.log(`Voter created ${voter}`);
  if (voter) {
    res.status(201).json({
      _id: voter.id,
      email: voter.email,
    });
  } else {
    res.status(400);
    throw new Error("Voter data invalid");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const voter = await Voter.findOne({ email });

  //compare password with hashedPassword
  const passwordCompare = await bcrypt.compare(password, voter.password);
  if (voter && passwordCompare) {
    const accessToken = jwt.sign(
      {
        voter: {
          name: voter.name,
          email: voter.email,
          role: voter.role,
          id: voter.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password invalid");
  }
});

exports.getMe = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const voter = await Voter.findById(id);
  if (!voter) {
    res.status(400);
    throw new Error("Voter not found");
  }
  res.status(200).json(voter);
});

exports.addVote = asyncHandler(async (req, res) => {
  const { voter, candidate } = req.body;
  if (!voter || !candidate) {
    res.status(400);
    throw new Error("All fields required");
  }
  const candidateAvailable = await Candidate.findOne({ candidate });
  if (!candidateAvailable) {
    res.status(500);
    throw new Error("Candidate not found");
  }
  let vote = new Vote({
    voter,
    candidate,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await vote.save({ session });
    candidate.voters.push(vote);
    await candidate.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  res.status(201).json(vote);
});

exports.removeVote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const vote = await Vote.findByIdAndRemove(id).populate("candidate");
  await vote.candidate.voters.pull(vote);
  await vote.candidate.save();
  if (!vote) {
    res.status(404);
    throw new Error("Vote nnot found");
  }
  res.status(204).json({ message: "Vote remove" });
});
