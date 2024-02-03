import express from "express";
import {
    UpdateProduct,
  createProduct,
  deleteProduct,
  filterProduct,
  getAllProduct,
  getLatestProduct,
  getSingleProduct,
} from "../controller/productController.js";
import { SingleUpload } from "../middleware/multer.js";
import { isAdmin } from "../middleware/admin.js";

export const productRoutes = express.Router();

//create products routes
productRoutes.post("/new", SingleUpload, createProduct);

//getting lastest products
productRoutes.get("/latest", getLatestProduct);

//all product
productRoutes.get("/allproduct", getAllProduct);

///getting sigle products
productRoutes.get("/:id", getSingleProduct);

//deleteing product via id
productRoutes.delete("/:id", deleteProduct);

//update existing product
productRoutes.put("/:id",SingleUpload, UpdateProduct);

//getting filter product
productRoutes.get("/search/filter", filterProduct);
