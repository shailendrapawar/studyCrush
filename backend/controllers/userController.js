import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserController{

    static register=async(req,res)=>{

        try{
            const{name,username,email,password,}=req.body;

        if(!name || !username || !email|| !password) throw new Error("input fields missing");

        const isExist=await UserModel.findOne({$or:[{email},{username}]})

        if(isExist){
            const resMsg=isExist.email===email?"email already taken":"username already taken";
            return res.status(400).json({
                msg:resMsg,
                success:false
            })
        }

        // hashing password================
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hashSync(password,salt);

        const newUser= new UserModel({
            username,
            name,
            email,
            password:hashPass
        })

        await newUser.save();

        return res.status(201).json({
            msg:"Registration successfull",
            success:true
        })

        }catch(err){
            console.log("registration error",err);
            return res.status(500).json({
                msg:"Something went wrong",
                success:false
            })
        }   
    }
    
    static login=async(req,res)=>{
        
    }
}

export default UserController;