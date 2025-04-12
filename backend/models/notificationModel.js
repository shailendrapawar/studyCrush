import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ["like", "comment", "save"],
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    notifyText:{
        type:String,
        required:true
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("Notification",notificationSchema);
