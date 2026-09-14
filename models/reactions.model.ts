import mongoose from "mongoose";

interface IReaction {
  whatIfId: mongoose.Types.ObjectId;
  reactionType: "funny" | "interesting" | "crazy" | "build";
  visitorId: string;
}

const reactionSchema = new mongoose.Schema<IReaction>(
  {
    whatIfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WhatIf",
      required: true,
    },

    reactionType: {
      type: String,
      enum: ["funny", "interesting", "crazy", "build"],
      required: true,
    },

    visitorId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One visitor → one reaction per What If
reactionSchema.index(
  { whatIfId: 1, visitorId: 1 },
  { unique: true }
);

const Reaction =
  mongoose.models.Reaction ||
  mongoose.model<IReaction>("Reaction", reactionSchema);

export default Reaction;