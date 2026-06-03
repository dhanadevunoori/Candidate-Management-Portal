const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: 0,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied",
    },
    phone: { type: String, trim: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);