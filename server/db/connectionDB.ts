import mongoose from "mongoose";
import dotenv from "dotenv";

//Bring in env variables
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    //conditional
    if (!mongoURI) {
      throw new Error("MongoDB is not defined in the environment variables");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;
