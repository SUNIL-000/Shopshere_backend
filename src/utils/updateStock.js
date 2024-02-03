import { Product } from "../model/ProductModel.js";

export const UpdateStock = async (orderItems) => {
  try {
    for (let i = 0; i < orderItems.length; i++) {
      const id = orderItems[i].productId;
      const product = await Product.findById(id);
      const quantityToSubtract = Number(orderItems[i].quantity);

      product.stock -= quantityToSubtract;
      await product.save();
      console.log("stock updated")
    }
  } catch (error) {
    console.log(error);
  }
};
