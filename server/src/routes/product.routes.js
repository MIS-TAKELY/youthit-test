import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controllers.js";

const productsRoute = express.Router();

productsRoute.post("/createProduct", createProduct);
productsRoute.post("/getProduct", getProducts);
productsRoute.post("/getProducts", getProduct);
productsRoute.post("/updateProduct", updateProduct);
productsRoute.post("/deleteProduct", deleteProduct);

export default productsRoute;
