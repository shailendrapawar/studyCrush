import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
import NotificationModel from "../models/notificationModel.js";
import ResourceModel from "../models/resourceModel/resourceModel.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
configDotenv();


class UserController {


    // 1:- register api =================
    static register = async (req, res) => {

        // console.log("inside register api")
        try {
            const { name, username, email, password } = req.body;

            if (!name || !username || !email || !password) {
                return res.status(400).json({
                    msg: "Input fields are missing.",
                    success: false
                })
            }

            const isExist = await UserModel.findOne({ $or: [{ email }, { username }] })

            if (isExist) {
                const resMsg = isExist.email === email ? "email already taken" : "username already taken";
                return res.status(400).json({
                    msg: resMsg,
                    success: false
                })
            }

            // hashing password================
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hashSync(password, salt);

            const newUser = new UserModel({
                username,
                name,
                email,
                password: hashPass,
                // notifications:[]
            })

            await newUser.save();

            return res.status(201).json({
                msg: "Registration successfull",
                success: true
            })

        } catch (err) {
            console.log("registration error", err);
            return res.status(500).json({
                msg: "Something went wrong",
                success: false
            })
        }
    }

    // 2:- login api =====================
    static login = async (req, res) => {

        try {

            const { identifier, password } = req.body;

            if (!identifier || !password) {
                return res.status(400).json({
                    msg: "Input fields are missing.",
                    success: false
                })
            }

            const isExist = await UserModel.findOne({ $or: [{ email: identifier }, { username: identifier }] });

            if (!isExist) {
                return res.status(400).json({
                    msg: "User not found ",
                    success: false
                })
            }

            //  compare password ==============
            const isMatch = await bcrypt.compareSync(password, isExist.password);
            if (!isMatch) {
                return res.status(401).json({
                    msg: "invalid credentials ",
                    success: false
                })
            }

            // creating JWT token============
            // console.log(isExist._id)
            const token = await jwt.sign({ userId: isExist._id }, process.env.JWT_SECRET_TOKEN, {
                expiresIn: "7d"
            })

            const userData = isExist.toObject();
            delete userData.password;

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                overwrite: true
            }).json({

                msg: "Login successfull",
                user: userData,
                id: isExist._id,
                notifications: isExist.notifications
            })

        } catch (err) {

            console.log("login error", err);
            return res.status(500).json({
                msg: "Something went wrong",
                success: false
            })
        }
    }



    // 3:-  saving or unsaving resource ==================
    static toggleSaveResource = async (req, res) => {
        try {
            const userId = req.id;
            const { resourceId } = req.params;
            // console.log(resourceId)

            if (!resourceId) throw new Error("Resource id missing");


            const user = await UserModel.findById(userId).select("savedResources");

            const isExist = await user.savedResources.some((id) => id.toString() === resourceId);


            if (isExist) {
                user.savedResources.pull(resourceId);
            } else {
                user.savedResources.push(resourceId);
            }

            await user.save();
            // console.log(isUpdated)
            return res.status(200).json({
                msg: isExist ? "resource unsave" : "resource saved",
                success: true
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "something went wrong",
                success: false
            })
        }
    }


    // 4:- mark all notification read===========

    static markNotificationRead = async (req, res) => {
        try {
            const userId = req.id;

            await NotificationModel.updateMany({ receiverId: userId }, {
                $set: { isRead: true }
            })

            res.status(200).json({ msg: "All notifications marked as read." });

        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: "Something went wrong." });
        }
    }

    // 5:-====== get all notifications==============

    static getAllNotifications = async (req, res) => {
        try {

            const userId = req.id;

            const userNotifications = await NotificationModel.find({ receiverId: userId }).populate({
                path: "senderId",
                select: "name profilePicture"
            }).sort({ createdAt: -1 }).limit(10);
            // console.log(userNotifications)

            return res.status(200).json({
                msg: "notifications found",
                success: true,
                userNotifications
            })

        } catch (err) {
            return res.status(400).json({
                msg: "internal server error",
                success: false,
            })
        }

    }

    static getAllSavedResources = async (req, res) => {
        try {

            const { resourcesId } = req.body
            // console.log(resourcesId)

            const allResources = await ResourceModel.find({ _id: resourcesId }).select("likes thumbnail comments")
            // console.log(allResources)
            if (allResources) {
                return res.status(200).json({
                    msg: "saved resources found",
                    success: true,
                    savedResources: allResources
                })
            }
        } catch (err) {
            return res.status(400).json({
                msg: "internal server error",
                success: false,
            })
        }
    }

    // update user profile image
    static updateUserProfileImage = async (req, res) => {
        try {

            // get the local path
            const coverImageLocalPath = req.file?.path
            // if cover image local path is not available then throw an error
            if (!coverImageLocalPath) {
                throw new Error("No image found")
            }
            console.log("cover image local path is: ", coverImageLocalPath)

            // upload image on cloudinary
            const coverImage = await uploadOnCloudinary(coverImageLocalPath)

            // if coverImage does not has url throw error
            if (!coverImage.url) {
                throw new ApiError(400, "Error while uploading on avatar")

            }

            // extract the public id and url
            const { public_id, url } = coverImage
            // find the user by Id and update

            const user = await UserModel.findByIdAndUpdate(
                req.id,
                {
                    $set: {
                        profilePicture: {
                            public_id,
                            url
                        }
                    }
                },
                { new: true }
            ).select("-password")

            // sedn back the updated user with update profile image
            return res
                .status(200)
                .json({
                    msg: "Profile image updated successfully",
                    success: true,
                    user
                }
                )

        } catch (error) {
            return res.status(500).json({
                msg: error.message,
                success: false
            })
        }
    }

    // delete user profile image
    static deleteUserProfileImage = async (req, res) => {

        try {
            // call the deleteOnCloudinary function and pass the public id
            const imageDeleted = await deleteOnCloudinary(req.body.public_id);

            // if res is null then throw an error
            if (imageDeleted.result !== "ok") {
                throw new Error("Error while deleting the image");
            }

            // find the user by Id and update
            const user = await UserModel.findByIdAndUpdate(
                req.id,
                {
                    $set: {
                        profilePicture: {
                            public_id: "",
                        }
                    }
                },
                { new: true }
            ).select("-password");

            // return the updated user with update profile image
            return res.status(200).json({
                msg: "Profile image deleted successfully",
                success: true,
                user
            })


        } catch (error) {
            return res.status(500).json({
                msg: error.message,
                success: false
            })
        }

    }

    // get user uploaded resources==========
    static getUserUploads = async (req, res) => {
        try {
            const { userId } = req.params;
            // console.log(userId)

            const userUploads = await ResourceModel.find({ uploadedBy: userId }).select("thumbnail likes comments")

            if (!userUploads) throw new Error(" erros in finding user uploads");

            return res.status(200).json({
                msg: " user uploads found",
                success: true,
                userUploads
            })


        } catch (err) {
            console.log("err in getUserUploads", err)
            return res.status(400).json({
                msg: " internal server error",
                success: false,

            })
        }

    }

    static getUserPublicProfile = async (req, res) => {
        // console.log(req.params)
        try {
            const { userId } = req.params

            const user = await UserModel.findById(userId).select("name username bio profilePicture")
            const resources =  ResourceModel.find({ uploadedBy: userId }).select("thumbnail comments likes")
            const userData = await Promise.all([user, resources])

            console.log(userData.length)

            // if (!userData) throw new Error("error in handling promises");

            return res.status(200).json({
                msg:"user found with data",
                user:userData[0],
                resources:userData[1],
                success:true
            })
            

    } catch (err) {
            console.log(err)
            return res.status(200).json({
                msg:"internal server error",
                success:false
            })
        }
    }


}

export default UserController;