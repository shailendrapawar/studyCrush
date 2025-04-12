import express from "express";
import ResourceController from "../controllers/resourceController.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const resourceRouter=express.Router();

resourceRouter.post("/createResource",authMiddleware,ResourceController.createResource);
resourceRouter.post("/deleteResource/:resourceId",authMiddleware,ResourceController.deleteResource);






export default resourceRouter;