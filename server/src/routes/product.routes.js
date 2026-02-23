import express from "express";
import { createProduct, deleteProduct, filterProduct, getProduct, getProducts, searchProducts, updateProduct } from "../controller/product.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const productsRoute = express.Router();

productsRoute.post("/createProduct", verifyToken, createProduct);
productsRoute.post("/getProduct", getProduct);
productsRoute.get("/getProducts", getProducts);
productsRoute.post("/updateProduct", updateProduct);
productsRoute.post("/deleteProduct", deleteProduct);
productsRoute.get("/searchProducts", searchProducts);
productsRoute.get("/filterProducts", filterProduct);

export default productsRoute;
