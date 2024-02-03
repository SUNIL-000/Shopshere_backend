import express from 'express';
import { CreateOrder, getAllOrder, getSingleOrder, getUserOrder, processOrder } from '../controller/OrderController.js';
import { isAdmin } from '../middleware/admin.js';

export const OrderRoutes =express.Router();


//create order
OrderRoutes.post("/new", CreateOrder)

//getting all order
OrderRoutes.get("/all", getAllOrder)

//get perticlar oorder by product :id
OrderRoutes.get("/singleorder", getSingleOrder);

//get user order
OrderRoutes.get("/:id", getUserOrder)

//process order status
OrderRoutes.put("/:id",isAdmin, processOrder)
