import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
import NotificationModel from "../models/notificationModel.js";
configDotenv();


class UserController {


    // 1:- register api =================
    static register = async (req, res) => {

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
            const token = await jwt.sign({ userId:isExist._id }, process.env.JWT_SECRET_TOKEN, {
                expiresIn: "7d"
            })

            const userData = isExist.toObject();
            delete userData.password;

            res.cookie("token", token, {
                httpOnly: true,
                secure:true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                overwrite:true
            }).json({

                msg: "Login successfull",
                user: userData,
                id:isExist._id
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

            if (!resourceId) throw new Error("Resource id missing");


            const user = await UserModel.findById(userId);

            const isExist = user.savedResources.includes(resourceId);

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

    static markAllRead = async (req, res) => {
        try {
            const userId = req.id;

            await NotificationModel.updateMany({ receiver: userId }, {
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
        const userId = req.id;

    }





}

export default UserController;