import ResourceModel from "../models/resourceModel.js";
class ResourceController {

    static createResource = async (req, res) => {

        try {

            console.log(req.id)
            const { title, description, link, tags } = req.body;

            if(!title||  !description || !link || !tags){
                
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

            if(!isCreated){
                return res.status(400).json({
                    msg: "resource not created",
                    success: false
                })
            }

            return res.status(201).json({
                msg: "resource uploaded",
                success: true
            })

        } catch (err){
            return res.status(400).json({
                msg: "something went wrong",
                success: false
            })

        }

    }

}

export default ResourceController