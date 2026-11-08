import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
          type: String,
          required: true,
        },
    hospital_id: {
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
    unit: {
        type: Number,
        required: true,
    },
    bloodgrp: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["Pending","Accepted","Completed"],
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Bloodbankdonate = mongoose.model("Bloodbankdonate", schema);