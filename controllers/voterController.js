const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.getMe = asyncHandler(async (req, res) => {});
