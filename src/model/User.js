// import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: [true, "please enter id.."] },
    name: { type: String, required: [true, "please enter name.."] },
    email: {
      type: String,
      unique: true,
      required: [true, "please enter gmail.."],
    },
    photo: { type: String, required: [true, "please enter photo.."] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    gender: { type: String, enum: ["male", "female"], required: true },
    dob: { type: Date },
  },
  { Timestamp: true }
);

export const User = mongoose.model("User", UserSchema);
