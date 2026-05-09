import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    availableSlots: [
      {
        date: { type: String, required: true },
        slots: [{ type: String, required: true }]
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Expert", expertSchema);