import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  photo: {
    type: String,
    required: [true, "please enter photo"],
  },
  stock: {
    type: Number,
    required: [true, "please enter name"],
  },
  price: {
    type: Number,
    required: [true, "please enter price"],
  },
  category: {
    type: String,
    required: [true, "please enter category"],
    trim:true
  },
},{
    timestamps:true
});

export const Product = mongoose.model("Products",ProductSchema);
