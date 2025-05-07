import { app, myHttpServer } from "./socket/socket.js";
import connectDb from "./configs/dbConnect.js";
import express from "express"
import { configDotenv } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

// middleware to parse cookies
app.use(cookieParser());

// ===========importing routes=============
import userRouter from "./routes/userRoutes.js"
import resourceRouter from "./routes/resourceRoutes.js";
// =========================================

// config dot env
configDotenv()
app.use(express.json());
app.use(cors({
    origin: ["*","http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))

// routes
app.use("/auth", userRouter);
app.use("/resource", resourceRouter);


// PORT
const PORT = process.env.PORT || 5000;

// call the connect DB
connectDb().then((res) => {
        if(res){
            myHttpServer.listen(PORT, () => {
                console.log(`server listening at ${PORT}`)
            })
        }
}).catch((err)=>{
    console.log("error in listening server")
})

