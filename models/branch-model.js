import mongoose, { Schema } from "mongoose";

const branchSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    code: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const branchModel =
  mongoose.models.branchInfos ?? mongoose.model("branchInfos", branchSchema);
