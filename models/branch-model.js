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

    date: {
      type: Date,
      default: Date.now,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    totalReceipt: {
      type: Number,
      default: 0,
    },

    totalPayment: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const branchModel =
  mongoose.models.branchInfos ?? mongoose.model("branchInfos", branchSchema);
