import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: true,
  },
  emailVerifyToken: {
    type: String,
    required: true,
    default: uuidv4().replace(/-/g, ""),
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dob: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["participant", "ra", "admin"],
    default: "participant",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
