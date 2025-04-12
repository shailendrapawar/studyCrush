import express from "express";
import UserController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter=express.Router();


userRouter.post("/register",UserController.register);
userRouter.post("/login",UserController.login)

userRouter.post("/toggleSaveResource/:resourceId",authMiddleware,UserController.toggleSaveResource);



export default userRouter;
