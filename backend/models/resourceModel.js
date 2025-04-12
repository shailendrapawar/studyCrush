import mongoose from "mongoose"

const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    default:[]

})


const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: "" // optional thumbnail if applicable
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [{
        type: String,
        trim: true,
        default:[]
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:[]
    }],
    
    comments:[commentSchema],

    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Resource",resourceSchema);
