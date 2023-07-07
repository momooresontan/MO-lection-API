const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: [8, "Password must have at least 8 characters"],
    },
    candidate: {
      type: mongoose.Types.ObjectId,
      ref: "Candidate",
    },
    role: {
      type: "String",
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
