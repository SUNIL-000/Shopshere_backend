import mongoose from "mongoose";

export const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sunilsahoosks2002:sunil000@cluster0.9afxkke.mongodb.net/shopshere"
    );

    console.log(`db connected ${conn.connection.host}`);
  } catch (error) {
    console.log("error while connecting to the database");
    console.error(error);
  }
};
