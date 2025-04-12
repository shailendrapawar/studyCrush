import resourceModel from "../models/resourceModel.js";
import ResourceModel from "../models/resourceModel.js";
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

            const isExist = await ResourceModel.findById(resourceId);

            if (!isExist) {
                return res.status(400).json({
                    msg: "resource not found",
                    success: false
                })
            }

            //   check if user is owner of reosurce========
            if (isExist.uploadedBy.toString() ==! userId) throw new Error(" not allowed");

            const isDeleted=await resourceModel.findByIdAndDelete(resourceId);

            return res.status(200).json({ message: "Resource deleted successfully" });

        } catch (err) {

            return res.status(400).json({
                msg: "something went wrong",
                success: false,
                err
            })

        }





    }


}

export default ResourceController