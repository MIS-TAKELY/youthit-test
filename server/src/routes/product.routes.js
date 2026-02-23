import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/product.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const productsRoute = express.Router();

productsRoute.post("/createProduct",verifyToken, createProduct);
productsRoute.post("/getProduct", getProducts);
productsRoute.post("/getProducts", getProduct);
productsRoute.post("/updateProduct", updateProduct);
productsRoute.post("/deleteProduct", deleteProduct);

export default productsRoute;
