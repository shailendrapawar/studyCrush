// import resourceModel from "../models/resourceModel/resourceModel.js";
import ResourceModel from "../models/resourceModel/resourceModel.js";
import CommentModel from "../models/resourceModel/commentModel.js"
// import NotificationModel from "../models/notificationModel.js";
import UserModel from "../models/userModel.js";
import NotificationCreator from "../services/NotificationCreator.js";

import { io } from "../socket/socket.js";

class ResourceController {

    static createResource = async (req, res) => {
        try {
            const userId = req.id
            const { title, description, link, tags, subject, thumbnail } = req.body;

            if (!title || !description || !link || !tags || !subject || !thumbnail) {

                return res.status(400).json({
                    msg: "Input feilds are missing",
                    success: false
                })
            }
            // console.log(req.body);
            const newResource = new ResourceModel({
                title,
                description,
                link,
                tags,
                subject,
                uploadedBy: userId,
                thumbnail
            })

            const isCreated = await newResource.save();

            if (!isCreated) {
                return res.status(400).json({
                    msg: "resource not created",
                    success: false
                })
            }

            return res.status(201).json({
                msg: "resource uploaded",
                success: true
            })

        } catch (err) {
            return res.status(400).json({
                msg: "something went wrong",
                success: false
            })

        }

    }

    static deleteResource = async (req, res) => {

        try {
            const userId = req.id;
            const { resourceId } = req.params

            const resource=await ResourceModel.findById(resourceId).select("_id uploadedBy");

            //return response if resource not found=====
            if (!resource) {
                return res.status(404).json({ message: "Resource not found" });
            }

            if (resource.uploadedBy.toString() !== userId) {
                return res.status(403).json({ message: "Not authorized to delete this resource" });
            }

            // console.log(resource)

            const isResourceDelete=await resource.deleteOne();
            const isCommentesDeleted=await CommentModel.deleteMany({resourceId:resourceId});

            //unsaving from those user who have saved it
            const isUnsaved=await UserModel.updateMany({savedResources:resourceId},{
                $pull:{savedResources:resourceId}
            })

            
            await Promise.all([isResourceDelete,isCommentesDeleted,isUnsaved]);

            return res.status(200).json({
                msg:"resource deleted",
                succes:true
            })

            
        } catch (err) {
            return res.status(400).json({
                msg: "something went wrong",
                success: false,
                err
            })

        }
    }

    static searchResource = async (req, res) => {
        try {

            const { search } = req.body;

            if (!search) {
                return res.status(400).json({
                    msg: "search query missing",
                    succes: false
                })
            }

            const resources = await ResourceModel.find({
                $or: [
                    { title: { $regex: search } },
                    { subject: { $regex: search } },
                    { tags: { $regex: search } }
                ]
            }).select(" title description tags thumbnail likes").sort({ likes: -1 })

            return res.status(200).json({
                msg: " resources found",
                success: true,
                result: resources
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: " resources not  found",
                success: false
            })
        }
    }


    static getAllResources = async (req, res) => {
        try {
            const limit = 10;
            const { page = 1 } = req.query

            const skip = (limit * page) - limit;

            const resources = await ResourceModel.find({}).skip(skip).limit(limit + 1).populate({
                path: "uploadedBy",
                select: " name profilePicture",
            })

            if (!resources) {
                return res.status(400).json({
                    msg: "no resources found",
                    success: false
                })
            }

            if (resources.length > limit) {
                resources.splice(limit, 1);
                return res.status(200).json({
                    msg: "resources found",
                    hasMore: true,
                    resources
                })
            }

            return res.status(200).json({
                msg: "resources found",
                hasMore: false,
                resources
            })

        } catch (err) {
            return res.status(400).json({
                msg: "somthing went wrong",
                success: false
            })
        }
    }

    static getSingleResource = async (req, res) => {
        try {
            const { resourceId } = req.params;

            if(!resourceId) throw new Error(" Resource ID missing");
            
            const resource = await ResourceModel.findById(resourceId).populate({
                path: "comments",
                populate: {
                    path: "user", select: " name profilePicture"
                },
                options:{sort:{createdAt:-1}},
                limit: 10,
            }).populate({
                path:"uploadedBy",
                select :"name profilePicture"
            })
            // console.log(resource);

            
            if (!resource) {
                
                return res.status(404).json({ msg: "Resource not found" });
            }
            return res.status(200).json({
                msg: "resource found",
                success: true,
                resource,
                
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "internal server error",
                success: false,
            })
        }
    }


    static addComment = async (req, res) => {
        try {
            const userId = req.id;
            const { resourceId, comment } = req.body;

            if (!resourceId || !comment) {
                return res.status(400).json({
                    msg: " input feilds are missing",
                    success: false,
                })
            }


            // 1:-  == making comment ================
            const newComment = new CommentModel({
                user: userId,
                resourceId,
                comment
            }) 
            const isSaved = await newComment.save().then((doc) => {
                return doc.populate({
                    path: "user",
                    select: " name profilePicture"
                })
            });
            if (!isSaved) throw new Error(" some error in comment save");



            //2:-   Pushing comment to resource===============
            const isUpdated = await ResourceModel.findByIdAndUpdate({ _id: resourceId }, {
                $push: { comments: isSaved._id }
            })
            // console.log(isUpdated)

            if (!isUpdated) throw new Error(" comment id not added in resource");


            //3:- creating notification  =============
            const newNotification=await NotificationCreator.create({
                senderId:userId,
                receiverId:isUpdated.uploadedBy,
                message:" commented on your resource",
                type:"comment",
                resourceId:isUpdated._id
            })

           
            const new_comment=await isSaved.populate({ path: "user", select: " name profilePicture " })


            // 4:- socket event for single resource page====
            io.to(resourceId).emit("singleResource-newComment",new_comment)


            return res.status(200).json({
                msg: "comment added",
                success: true,
                newComment:new_comment
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "something went wrong",
                success: false,
            })
        }
    }

    
    static getResourceComments = async (req, res) => {

        try {
            const { resourceId } = req.params;

            if (!resourceId) throw new Error("  resource id not found");

            const comments = await CommentModel.find({ resourceId }).populate({
                path: "user",
                select: " profilePicture name"
            }).sort({ createdAt: -1 }).limit(20)

            return res.status(200).json({
                msg: " comments found",
                success: true,
                comments
            })

        } catch (err) {
            return res.status(400).json({
                msg: " comments not found",
                success: false,

            })
        }
    }



    static toggleLike = async (req, res) => {
        try {

            const userId = req.id;
            const { resourceId } = req.params;

            // 1:- find resource===========
            const resource = await ResourceModel.findById(resourceId);

            if (!resource) throw new Error("Resource not found");

            // 2:- check for like===========
            const hasLike = resource.likes.includes(userId);

            if (hasLike) {
                resource.likes.pull(userId)
                // emitting event for reducing likes of the post
                io.to(resourceId).emit("singleResource-unlike",userId)

            } else {
                resource.likes.push(userId)
                 //3:-make a notifications if liking the post===============      
                 const newNotification=await  NotificationCreator.create({
                    senderId:userId,
                    receiverId:resource.uploadedBy,
                    type:"like",
                    message:"liked your resource",
                    resourceId:resource._id
                 })

                //  4:- emmiting event for increasing lieks of post
                 io.to(resourceId).emit("singleResource-like",userId)

            }


            const isToggled = await resource.save();

            if (!isToggled) throw new Error(" error in toggling like");

            res.status(200).json({
                msg: "toggled successfully",
                success: true
            })


        } catch (err) {
            console.log(err)
            res.status(400).json({
                msg: "something went wrong",
                success: true
            })
        }
    }


}

export default ResourceController