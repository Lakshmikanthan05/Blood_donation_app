import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "User",
    },
    donor_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    bloodgrp: {
        type: String,
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
    date: {
        type: Date,
        default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

export const Newstock = mongoose.model("Newstock", schema);