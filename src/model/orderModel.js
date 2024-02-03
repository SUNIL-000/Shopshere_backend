import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
  },
  user: { type: String, ref: "User" },
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  shippingCharges: { type: Number, required: true },
  discount: { type: Number, required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["processing", "shipped", "deliverd"],
    default: "processing",
  },
  orderItems: [
    {
      name: { type: String, required: true },
      photo: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
      },
    },
  ],
});

export const Order = mongoose.model("Order", OrderSchema);
