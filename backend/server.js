import { app, myHttpServer } from "./socket/socket.js"
import connectDb from "./configs/dbConnect.js";
import express from "express"
import { configDotenv } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

app.use(cookieParser());

// ===========importing routes=============
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
// =========================================

configDotenv()



app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["*","http://localhost:5173"],
    credentials:true
}))
app.use("/auth", userRouter);
app.use("/resource", resourceRouter);


app.get("/", (req, res) => {
    res.send("server listening")
})



const PORT = process.env.PORT || 5000;
connectDb().then((res) => {
        if(res){
            myHttpServer.listen(PORT, () => {
                console.log(`server listening at ${PORT}`)
            })
        }
}).catch((err)=>{
    console.log("error in listening server")
})

