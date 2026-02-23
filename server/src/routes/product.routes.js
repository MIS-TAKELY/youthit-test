import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, searchProducts, updateProduct } from "../controller/product.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const productsRoute = express.Router();

productsRoute.post("/createProduct",verifyToken, createProduct);
productsRoute.post("/getProduct", getProducts);
productsRoute.get("/getProducts", getProduct);
productsRoute.post("/updateProduct", updateProduct);
productsRoute.post("/deleteProduct", deleteProduct);
productsRoute.get("/searchProducts", searchProducts);

export default productsRoute;
