import express from "express";
import { isAdmin } from "../middleware/admin.js";
import { DeleteUser, createUser, getAllUser, getSingleUser } from "../controller/userController.js";

export const user = express.Router();

//new user
user.post("/new", createUser);

//getting all user
user.get("/all", isAdmin, getAllUser);

//getiing sigle user by :id
user.get("/:id", isAdmin, getSingleUser);

//deleteing single user
user.delete("/:id", isAdmin, DeleteUser);
