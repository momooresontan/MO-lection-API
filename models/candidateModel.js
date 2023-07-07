const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: [true, "Candidate must have a name"],
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
