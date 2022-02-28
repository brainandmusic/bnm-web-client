import mongoose from "mongoose";

const StudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Private", "Public"],
    required: true,
    default: "Private",
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
  members: [mongoose.Types.ObjectId],
  participants: [mongoose.Types.ObjectId],
  arms: [
    {
      name: {
        type: String,
        required: true,
      },
      events: [
        {
          name: {
            type: String,
            required: true,
          },
          experiments: [mongoose.Types.ObjectId],
        },
      ],
    },
  ],
});

export default mongoose.models.Study || mongoose.model("Study", StudySchema);
