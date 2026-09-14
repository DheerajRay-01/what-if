import mongoose from "mongoose";

interface IWhatIf {
  content: string;

  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };

  replyCount: number;

  status: "active" | "deleted";
}

const whatIfSchema = new mongoose.Schema<IWhatIf>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    reactionCounts: {
      funny: {
        type: Number,
        default: 0,
      },
      interesting: {
        type: Number,
        default: 0,
      },
      crazy: {
        type: Number,
        default: 0,
      },
      build: {
        type: Number,
        default: 0,
      },
    },

    replyCount: {
      type: Number,
      default: 0,
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


whatIfSchema.index({
  status: 1,
  _id: -1,
});

const WhatIf =
  mongoose.models.WhatIf ||
  mongoose.model<IWhatIf>("WhatIf", whatIfSchema);

export default WhatIf;