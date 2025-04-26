import express from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const userRouter = express.Router();

// auth routes
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

// resource routes
userRouter.post(
  "/toggleSaveResource/:resourceId",
  authMiddleware,
  UserController.toggleSaveResource
);
userRouter.post(
    "/getSavedResources",
    authMiddleware,
    UserController.getAllSavedResources
);

// notification routes
userRouter.get(
  "/getAllNotifications",
  authMiddleware,
  UserController.getAllNotifications
);
userRouter.post(
  "/markNotificationRead",
  authMiddleware,
  UserController.markNotificationRead
);

//user uploads and saved resources ==

userRouter.post("/getSavedResources",authMiddleware,UserController.getAllSavedResources);
userRouter.get("/getUserUploads/:userId",authMiddleware,UserController.getUserUploads);


// profile image routes
// update the profile image
userRouter.post(
  "/update-profile-image",
  upload.single("profileImage"),
  authMiddleware,
  UserController.updateUserProfileImage
);
// delete the profile image
userRouter.delete(
  "/delete-profile-image",
  authMiddleware,
  UserController.deleteUserProfileImage
);

export default userRouter;
