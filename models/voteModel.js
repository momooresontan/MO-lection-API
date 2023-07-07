const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    voter: {
      type: mongoose.Types.ObjectId,
      ref: "Voter",
      required: [true, "Vote must belong to a voter"],
    },
    candidate: {
      type: mongoose.Types.ObjectId,
      ref: "Candidate",
      required: [true, "Vote must be on a candidate"],
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
