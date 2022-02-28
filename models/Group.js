import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  members: [mongoose.Types.ObjectId],
  studyId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
