import { Order } from "../model/orderModel.js";

export const CreateOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      user,
      subTotal,
      tax,
      shippingCharges,
      discount,
      total,
      orderItems,
    } = req.body;

    const newOrder = await Order.create({
      shippingInfo,
      user,
      subTotal,
      tax,
      shippingCharges,
      discount,
      total,
      orderItems,
    });
    // console.log(newOrder);
    if (!newOrder) {
      return res.status(400).json({
        success: false,
        message: "Failed to create order",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Order successfully.",
      newOrder,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while creating order.",
      error,
    });
  }
};

//get all order

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name");
    // console.log(newOrder)
    if (!orders) {
      return res.status(400).json({
        success: true,
        message: "No order found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetching all order details..",
      orders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while fetching orders.",
      error,
    });
  }
};

//get order on the basis of product :id
export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.query;

    const order = await Order.findOne({ "orderItems.productId": id }).populate(
      "user",
      "name"
    );

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "No order found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetching order details..",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while fetching order.",
      error,
    });
  }
};

//get all the order of a user
export const getUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findone(id).populate("user", "name");
    // console.log(newOrder)
    if (!orders) {
      return res.status(400).json({
        success: true,
        message: "No order found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetching single order details..",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while single fetching orders.",
      error,
    });
  }
};

//process order status
export const processOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ "orderItems.productId": id }).populate(
      "user",
      "name"
    );

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "No order found",
      });
    }
    switch (order.status) {
      case "processing":
        order.status = "shipped";
        break;

      case "shipped":
        order.status = "deliverd";
        break;

      default:
        order.status = "deliverd";
    }
    await order.save();
    return res.status(200).json({
      success: true,
      message: `order ${order.status}`,
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while processing order status.",
      error,
    });
  }
};
