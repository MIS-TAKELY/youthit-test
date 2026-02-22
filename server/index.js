import dotenv from "dotenv";
import express from "express";
import { dbConnect } from "./src/utlis/dbConnect.js";
import authRouter from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json())

app.use("/api/v1",authRouter)


const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {
  console.log(`sever running on port ${PORT}`);
});
