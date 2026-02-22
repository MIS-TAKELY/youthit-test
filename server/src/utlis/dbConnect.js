import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) throw new Error("URl is not avilable");
    const mongooseConnectionResponse = await mongoose.connect(MONGO_URL);
    if (!mongooseConnectionResponse)
      throw new Error("Unable to connect with database");

    console.log("Database connected successfully")
  } catch (error) {
    console.log("Database Error-->", error);
    console.error("Database Error-->", error.message);
  }
};
