import resourceModel from "../models/resourceModel/resourceModel.js";
import ResourceModel from "../models/resourceModel/resourceModel.js";
import CommentModel from "../models/resourceModel/commentModel.js"
class ResourceController {

    static createResource = async (req, res) => {

        try {
            // console.log(req.id)
            const { title, description, link, tags } = req.body;

            if (!title || !description || !link || !tags) {

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
                uploadedBy: req.id
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

            if (!resourceId) throw new Error(" resource id not found");

            const isExist = await ResourceModel.findById(resourceId);

            if (!isExist) {
                return res.status(400).json({
                    msg: "resource not found or deleted",
                    success: false
                })
            }

            //   check if user is owner of reosurce========
            if (isExist.uploadedBy.toString() == !userId) throw new Error(" not allowed");

            await resourceModel.findByIdAndDelete(resourceId);

            return res.status(200).json({ message: "Resource deleted successfully" });

        } catch (err) {

            return res.status(400).json({
                msg: "something went wrong",
                success: false,
                err
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

            const newComment = new CommentModel({
                user: userId,
                resourceId,
                comment
            })

            // adding new comment ======================
            const isSaved = await newComment.save().then((doc) => {
                return doc.populate({
                    path: "user",
                    select: " name profilePicture"
                })
            });

            if (!isSaved) throw new Error(" some error in comment save");

            //  Pushing commentId to resource===============
            const isUpdated = await ResourceModel.findByIdAndUpdate({ _id: resourceId }, {
                $push: { comments: isSaved._id }
            })

            if (!isUpdated) throw new Error(" comment id not added in resource");

            return res.status(200).json({
                msg: "comment added",
                success: true,
                newComment: isSaved
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "something went wrong",
                success: false,
            })
        }
    }

    static toggleLike = async (req, res) => {
        try {

            const userId = req.id;
            const { resourceId } = req.params;


            const resource = await ResourceModel.findById(resourceId);

            if(!resource) throw new Error("Resource not found");
            

            const hasLike = resource.likes.includes(userId);

            if (hasLike) {
                resource.likes.pull(userId)
            } else {
                resource.likes.push(userId)
            }


            const isToggled=await resource.save();

            if(!isToggled) throw new Error(" error in toggling like");
            
            res.status(200).json({
                msg: "toggled successfully",
                success:true
            })


        } catch (err) {
            console.log(err)
            res.status(400).json({
                msg: "something went wrong",
                success:true
            })
        }

    }


}

export default ResourceController