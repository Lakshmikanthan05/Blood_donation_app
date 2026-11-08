import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "User",
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
    gender: {
      type: String,
      required: true,
    },
    isEligible: {
      type: Boolean,
      default: true,
    },
    lastdonate: {
      type: Date,
      required: true,
      default: Date.now,
    }
    
  },
  {
    timestamps: true,
  }
);

export const Donor = mongoose.model("Donor", schema);