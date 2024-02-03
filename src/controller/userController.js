import { User } from "../model/User.js";

export const createUser = async (req, res) => {
  try {
    const { _id, name, photo, email, gender, role, dob } = await req.body;

    const newUser = await User.create({
      _id,
      name,
      photo,
      email,
      gender,
      role,
      dob,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message:"user Created successfully..",
      newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};


//retriving all user funtion
export const getAllUser = async (req, res) => {
  try {
   
    const users = await User.find({});
   
    return res.status(200).json({
      success: true,
      message:"getting all users",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

//retreiving single user 
export const getSingleUser = async (req, res) => {
    try {
     const {id} =req.params;
      const user = await User.findById({
        _id:id
      });
     if(!user)
     return res.status(400).json({
        success: true,
        message:"No user found",
       
      });




      return res.status(200).json({
        success: true,
        message:"getting single users",
        user,
      });


     
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `failed to get single user ${error}`,
      });
    }
  };

  
export const DeleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    await User.findByIdAndDelete({
        _id:id
    })
    return res.status(200).json({
      success: true,
      message: "user delted successfully"
      
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `failed to delete single user ${error}`,
    });
  }
};
