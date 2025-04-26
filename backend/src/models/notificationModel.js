import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type:{
        type:String,
        enum:["like","comment","save"]
    },
    message:{
        type:String,
        required:true
    },
    isRead: {
        type: Boolean,
        default: false
    },
},{
    timestamps:true
})

export default mongoose.model("Notification", notificationSchema);
