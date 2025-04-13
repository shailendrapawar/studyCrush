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
        url:{
            type:String,
            default:""
        },
        publicId:String,
        
    },
    bio:{
        type:String,
        default:"Hey everyone, lets prepare... "
    },
    savedResources:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resource"
        }
    ],

    notifications:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification",
        // default:[]
    },
    joinedAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("User",userSchema)