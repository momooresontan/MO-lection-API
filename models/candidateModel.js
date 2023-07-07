const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate must have a name"],
    },
    email: {
      type: String,
      required: [true, "Candidate must have an email address"],
    },
    party: {
      type: String,
      required: [true, "Candidate must belong to a party"],
      uppercase: true,
    },
    voters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Voter",
      },
    ],
    votes_count: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
