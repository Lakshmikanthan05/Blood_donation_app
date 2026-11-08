import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Donor", "Blood_bank", "Hospital"], 
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    detail:[
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "role",
        },
    ],
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);