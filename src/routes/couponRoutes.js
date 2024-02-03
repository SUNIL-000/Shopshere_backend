import Express from "express";
import {
  CreateCoupon,
  deleteCoupon,
  getAllCoupon,
  getSingleCoupon,
} from "../controller/couponController.js";
import { isAdmin } from "../middleware/admin.js";
export const couponRoutes = Express.Router();

//create coupon
couponRoutes.post("/new", isAdmin, CreateCoupon);
//GET ALL COUPON
couponRoutes.get("/all", isAdmin, getAllCoupon);

//single coupon
couponRoutes.get("/single", getSingleCoupon);

//delete coupon
couponRoutes.delete("/:id", isAdmin, deleteCoupon);
