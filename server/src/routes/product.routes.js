import express from "express";
import { createProduct, deleteProduct, filterProduct, getProduct, getProducts, searchProducts, updateProduct } from "../controller/product.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const productsRoute = express.Router();

productsRoute.post("/createProduct", verifyToken, createProduct);
productsRoute.get("/getProduct/:id",verifyToken, getProduct);
productsRoute.get("/getProducts", getProducts);
productsRoute.patch("/updateProduct/:id",verifyToken, updateProduct);
productsRoute.delete("/deleteProduct/:id",verifyToken, deleteProduct);
productsRoute.get("/searchProducts", searchProducts);
productsRoute.get("/filterProducts", filterProduct);

export default productsRoute;
