 import express from "express"
 const socialRouter =express.Router();

 import authMiddleware from "../middlewares/authMiddleware.js";
 import SocialController from "../controllers/socialController.js"


 socialRouter.post("/send-friend-request/:receiverId",authMiddleware,SocialController.sendFriendRequest);
  socialRouter.post("/accept-friend-request/:senderId",authMiddleware,SocialController.acceptFriendRequest);

  socialRouter.post("/reject-friend-request/:senderId",authMiddleware,SocialController.rejectFriendRequest);

  socialRouter.get("/get-friend-list/:userId",authMiddleware,SocialController.getFriendList);

  socialRouter.post("/toggle-block-user/:targetUserId",authMiddleware,SocialController.toggleBlockUser)


 export default socialRouter;