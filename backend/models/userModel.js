import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        url:String,
        publicId:String
    },
    bio:{
        type:String,
    },
    savedResources:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resource"
        }
    ],

    joinedAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("User",userSchema)