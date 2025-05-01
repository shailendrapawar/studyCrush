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
            // default:"https://t3.ftcdn.net/jpg/11/28/72/58/240_F_1128725808_hckpy1JZOnVoTR0jMrHk8IMjctH69C3I.jpg",

            default:"https://media.istockphoto.com/id/2149922267/vector/user-icon.jpg?b=1&s=612x612&w=0&k=20&c=KN-gGdZgIxXeJgjHR40NxEWR9n6ar5YmFMi1k3OWtrM="
            // default:"data:image/jpeg;base64,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"
        },
      
        public_id: {
            type: String,
            default: ""
        },

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
    joinedAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("User",userSchema)