import {app,myHttpServer} from "./socket/socket.js"
import express from "express"
import { configDotenv } from "dotenv";
import cors from "cors"

configDotenv()

app.use(express.json());
app.use(cors({
    origin:["*"],
}))

app.get("/",(req,res)=>{
    res.send("server listening")
})

const PORT=process.env.PORT||5000;

myHttpServer.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`)
})

