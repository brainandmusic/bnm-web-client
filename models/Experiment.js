import mongoose from "mongoose";

const experimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  platform: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  creator: {
    type: mongoose.ObjectId,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Experiment ||
  mongoose.model("Experiment", experimentSchema);
