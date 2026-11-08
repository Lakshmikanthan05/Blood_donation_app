import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
          type: mongoose.Schema.Types.ObjectId, 
          required: true,
          ref: "User",
        },
    center: {
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
  },
  {
    timestamps: true,
  }
);

export const Hospital = mongoose.model("Hospital", schema);