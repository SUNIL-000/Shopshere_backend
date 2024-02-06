//for ccreating a product
import { rm } from "fs";
import { Product } from "../model/ProductModel.js";
// import { Product } from "../model/ProductModel.js";
import fs from "fs/promises";
//creating product
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category } =await  req.body;
    const photo =await req.file;
    if (!photo) {
      return res.status(400).json({
        success: false,
        message: " please upload photo",
      });
    }
    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("photo deleted ");
      });
      return res.status(400).json({
        success: false,
        message: " please fill all the required fields",
      });
    }
    const product = await Product.create({
      name,
      price,
      stock,
      category,
      photo: photo?.path,
    });
    await product.save();

    return res.status(201).json({
      success: true,
      message: " Product Created successfully...",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to create product",
      
    });
  }
};

//get latest products
export const getLatestProduct = async (req, res) => {
  try {
    const latestProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(8);
    return res.status(200).json({
      success: true,
      message: " getting latest products",
      latestProducts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to create product",
      error,
    });
  }
};

// get single product
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const SingleProduct = await Product.findById({
      _id: id,
    });

    return res.status(200).json({
      success: true,
      message: " getting single products",
      SingleProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to fetch product details",
      error,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const SingleProduct = await Product.findByIdAndDelete({
      _id: id,
    });
    rm(SingleProduct.photo, () => {
      console.log("photo deleted ");
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to delete product",
      error,
    });
  }
};
//update products
// Using fs.promises for asynchronous file operations

export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // const { name, price, stock, category } =await req.body;
    const { name, price, stock, category } = req.body;

    const photo = req.file;
    console.log(name + " " + price + " " + stock + " " + category + photo);
    // Find the product by ID
    const SingleProduct = await Product.findById(id);

    // Check if the product exists
    if (!SingleProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the product properties if provided in the request body
    if (name) {
      SingleProduct.name = name;
    }
    if (price) {
      SingleProduct.price = price;
    }
    if (stock) {
      SingleProduct.stock = stock;
    }
    if (category) {
      SingleProduct.category = category;
    }

    // Check if a new photo is provided
    if (photo) {
      // Remove the old photo if it exists
      if (SingleProduct.photo) {
        await fs.unlink(SingleProduct.photo);
        console.log("Old photo removed successfully");
      }

      // Set the path of the new photo
      SingleProduct.photo = photo.path;
    }

    // Save the updated product
    const updateProduct = await SingleProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      updateProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error,
    });
  }
};

//filter products
export const filterProduct = async (req, res) => {
  try {
    const { search, sort, range, category } = req.query;
    let baseQuery = {};
    if (search) {
      baseQuery.name = {
        $regex: search,
      };
    }
    if (range) {
      baseQuery.price = {
        $lte: Number(range),
      };
    }
    if (category) {
      baseQuery.category = {
        category,
      };
    }

    const products = await Product.find(baseQuery).sort({
      price: sort === "asc" ? -1 : 1,
    });

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No product found",
      });
    }

    return res.status(200).json({
      success: true,
      message: " product found",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch product details..",
      error,
    });
  }
};
//get all products
export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find({})

    if(!allProduct){
      return res.status(404).json({
        success: true,
        message: "No product found ",
        allProduct,
      });
    }
    return res.status(200).json({
      success: true,
      message: " getting all products",
      allProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to fetch all product",
      error,
    });
  }
};