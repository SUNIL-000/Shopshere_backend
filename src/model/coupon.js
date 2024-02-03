import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "please enter code"],
  },
  amount: {
    type: String,
    required: [true, "please enter amount"],
  },
});

export const Coupon = mongoose.model("Coupon", CouponSchema);
