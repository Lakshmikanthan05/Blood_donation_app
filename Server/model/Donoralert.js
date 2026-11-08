import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "User",
    },
    branch_id:{
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    state: {
        type: String,
        enum: [ "Accepted", "Rejected", "Donated", "pending"],
        required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const Donoralert = mongoose.model("Donoralert", schema);