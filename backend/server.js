import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";

import authRoutes from "./Routes/authRoutes.js";
import employeeRoutes from "./Routes/employeeRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
