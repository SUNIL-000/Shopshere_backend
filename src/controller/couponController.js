import { stripe } from "../../app.js";
import { Coupon } from "../model/coupon.js";

//create payment
export const createPayment = async (req, res) => {
  try {
    const { amount } = await req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
    });
    return res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:"error while creating payment"
    })
  }
};

export const CreateCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;
    if (!code || !amount) {
      return res.status(400).json({
        success: false,
        message: "please provide code and amount.",
      });
    }
    const newCoupon = await Coupon.create({ code, amount });

    if (!newCoupon) {
      return res.status(400).json({
        success: false,
        message: "failed to create coupon",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      newCoupon,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create coupon. ",
    });
  }
};

//get all coupon
export const getAllCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    if (!coupons) {
      return res.status(400).json({
        success: true,
        message: "No coupon code found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "coupon code fetched",
      coupons,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create coupon. ",
    });
  }
};

//get single coupon
export const getSingleCoupon = async (req, res) => {
  try {
    const { code } = await req.query;

    const coupons = await Coupon.findOne({ code });
    if (!coupons) {
      return res.status(400).json({
        success: true,
        message: "No coupon code found",
      });
    }

    // let discount;
    return res.status(200).json({
      success: true,
      message: "coupon code fetched",
      discount: coupons.amount,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch coupon. ",
    });
  }
};

// delete coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = await req.params;

    const coupons = await Coupon.findByIdAndDelete(id);
    if (!coupons) {
      return res.status(400).json({
        success: true,
        message: "No coupon  found",
      });
    }

    // let discount;
    return res.status(200).json({
      success: true,
      message: "coupon deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete coupon. ",
    });
  }
};
