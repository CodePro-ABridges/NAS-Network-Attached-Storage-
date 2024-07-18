import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectionDB.ts";
import userRoutes from "./routes/userRoutes.ts";
import fileRoutes from "./routes/fileRoutes.ts";
import cors from "cors";

//Bring env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//apply middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();

    //apply routes
    app.use("/api/users", userRoutes);
    app.use("/api/files", fileRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database: ", err);
    process.exit(1);
  }
};

startServer();
