import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectionDB.ts";

//Bring env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

//app.use("/api/users", userRoutes);
//app.use("/api/files", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
