import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        expert_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expert',
            required: true
        },
        date: {
            type: String,
            required: true
        },
        slot: {
            type: String,
            required: true
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        notes: { type: String },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Completed'],
            default: 'Confirmed'
        }
    },
    { timestamps: true }
);

// Compound unique index to prevent double booking
bookingSchema.index({ expert_id: 1, date: 1, slot: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);