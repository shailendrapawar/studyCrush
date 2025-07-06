import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        url: {
            type: String,
            // default:"https://t3.ftcdn.net/jpg/11/28/72/58/240_F_1128725808_hckpy1JZOnVoTR0jMrHk8IMjctH69C3I.jpg",

            default: "https://media.istockphoto.com/id/2149922267/vector/user-icon.jpg?b=1&s=612x612&w=0&k=20&c=KN-gGdZgIxXeJgjHR40NxEWR9n6ar5YmFMi1k3OWtrM="
        },

        public_id: {
            type: String,
            default: ""
        },

    },
    bio: {
        type: String,
        default: "Hey everyone, lets prepare... "
    },
    savedResources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource"
        }
    ],


    // handling friend system===
    friends: [
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    sentRequests: [
         {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    friendRequests: [
         {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    blockedUsers: [
         {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],

    // ==========================

    
    joinedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema)