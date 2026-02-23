import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import productsRoute from "./src/routes/product.routes.js";
import { dbConnect } from "./src/utlis/dbConnect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1", productsRoute);

const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {
  console.log(`sever running on port ${PORT}`);
});
