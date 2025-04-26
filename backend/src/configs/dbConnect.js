import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();


const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL);
        if(res){
           console.log("db connected..")
           return true
        }

    } catch (err) {
        console.log(err)
        return false
    }
}

export default connectDb;