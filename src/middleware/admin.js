import { User } from "../model/User.js";

export const isAdmin = async (req, res,next) => {
  try {
    const { id } = req.query;
    if(!id){
      return res.status(400).json({
        success: true,
        message: "please provide your id",
      });
    }
    const user = await User.findById({
      _id: id,
    });

    if (!user || user.role !== "admin")
      return res.status(404).json({
        success: true,
        message: "you are not a admin ",
      });
      next();
  } catch (error) {}
};
