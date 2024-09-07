import mongoose, { Schema } from "mongoose";

const daySchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    code: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true }
);

export const dayModel =
  mongoose.models.dayinfos ?? mongoose.model("dayinfos", daySchema);
