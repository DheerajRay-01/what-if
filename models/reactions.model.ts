import mongoose from "mongoose";

interface IReaction {
  authorId: mongoose.Types.ObjectId;
  whatIfId: mongoose.Types.ObjectId;
  reactionType: "funny" | "interesting" | "crazy" | "build";
}

const reactionSchema = new mongoose.Schema<IReaction>(
  {
    authorId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
    },
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