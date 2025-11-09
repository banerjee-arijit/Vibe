import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";
import { connectDB } from "./src/db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at the port ${PORT}`);
  connectDB();
});
