import { app, myHttpServer } from "./socket/socket.js"
import connectDb from "./configs/dbConnect.js";
import express from "express"
import { configDotenv } from "dotenv";
import cors from "cors"

// ===========importing routes=============
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
// =========================================


configDotenv()

app.use(express.json());
app.use(cors({
    origin: ["*"],
}))
app.use("/user", userRouter);
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
})

