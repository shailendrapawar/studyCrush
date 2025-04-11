import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
configDotenv();


class UserController {


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
                password: hashPass
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
            const token = await jwt.sign({ userId: isExist._id }, process.env.JWT_SECRET_TOKEN, {
                expiresIn: 7 * 24 * 60 * 60 * 1000
            })

            const userData = isExist.toObject();
            delete userData.password;

            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json({

                msg: "Login successfull",
                user: userData
            })

        } catch (err) {

            console.log("login error", err);
            return res.status(500).json({
                msg: "Something went wrong",
                success: false
            })

        }

    }



}

export default UserController;