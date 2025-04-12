import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

export default mongoose.model("Comment", commentSchema);