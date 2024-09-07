import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    date: {
      required: true,
      type: Date,
    },
    branch: {
      required: true,
      type: String,
    },
    voucherCode: {
      required: true,
      type: String,
      //   unique: true,
    },
    voucherType: {
      required: true,
      type: String,
      enum: ["receipt", "payment"],
    },
    creditAccounts: {
      required: true,
      type: String,
    },
    debitAccounts: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
    narration: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const voucherModel =
  mongoose.models.vouchers || mongoose.model("vouchers", voucherSchema);
