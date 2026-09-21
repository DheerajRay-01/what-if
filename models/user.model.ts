import mongoose from "mongoose";

interface IUser {
  displayName: string | null;
  publicId: string;
  name:string;
  authUserId: string;

  email: string;

  totalPosts: number;
  totalReplies: number;

  status: "active" | "deleted";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    displayName: {
      type: String,
      trim: true,
      maxlength: 32,
      default: null,
    },
    name: {
      type: String,
      trim: true,
    },

    authUserId: {
      type: String,
      required: true,
      unique: true,
    },

    publicId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },

    totalPosts: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalReplies: {
      type: Number,
      default: 0,
      min: 0,
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

const User =
  mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);

export default User;