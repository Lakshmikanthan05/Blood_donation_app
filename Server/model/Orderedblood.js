import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "Blood_bank",
    },
    A_positive: { 
        type: Number,
        default: 0 
    },
    A_negative: { 
        type: Number, 
        default: 0 
    },
    B_positive: { 
        type: Number, 
        default: 0 
    },
    B_negative: { 
        type: Number, 
        default: 0 
    },
    AB_positive: { 
        type: Number, 
        default: 0 
    },
    AB_negative: { 
        type: Number, 
        default: 0 
    },
    O_positive: { 
        type: Number, 
        default: 0 
    },
    O_negative: { 
        type: Number, 
        default: 0 
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Orderedblood = mongoose.model("Orderedblood", schema);