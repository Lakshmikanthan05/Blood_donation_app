import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
          type: mongoose.Schema.Types.ObjectId, 
          required: true,
          ref: "User",
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
    location: {
        latitude: {
        type: Number,
        
      },
      longitude: {
        type: Number,
      },
    },
    status: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
        },
    ],
  },
  {
    timestamps: true,
  }
);

export const Blood_bank = mongoose.model("Blood_bank", schema);