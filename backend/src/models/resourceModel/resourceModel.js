import mongoose from "mongoose"

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
    subject:{
        type:"String",
        trim:true

    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:[]
    }],
    
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
            default:[]
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Resource",resourceSchema);
