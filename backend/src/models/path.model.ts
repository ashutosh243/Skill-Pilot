import mongoose, { Mongoose } from "mongoose";


const pathSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["beginner", "Intermediate", "advanced"],
        required: true
    },
    timePerDay: {
        type: Number,
        required: true,
    },
    currentSkills: {
        type: [String],
        default: []
    },
    targetSkills: {
        type: [String],
        default: []
    },
    missingSkills: {
        type: [String],
        default: []
    },
    learningPath: {
        type: [
            {
                day: { type: String, required: true },
                heading: { type: String, required: true },
                explanation: { type: String, required: true },
                completed: { type: Boolean, default: false },
                reminderSent: {type: [Number], default: []},
            }
        ],
        default: []
    },
    startDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Path', pathSchema);