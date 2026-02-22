import express from "express";
import { loginHandler, signupHandler } from "../controller/auth/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/login", loginHandler);
authRouter.post("/signup", signupHandler);

export default authRouter;
