import mongoose from "mongoose";

interface IReply {
  whatIfId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId | null;
  content: string;
  status: "active" | "deleted";
}

const replySchema = new mongoose.Schema<IReply>(
  {
    whatIfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WhatIf",
      required: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
      default: null,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index for fetching replies with cursor pagination
replySchema.index({
  whatIfId: 1,
  _id: -1,
});

const Reply =
  mongoose.models.Reply ||
  mongoose.model<IReply>("Reply", replySchema);

export default Reply;