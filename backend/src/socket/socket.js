import express from "express"
import { configDotenv } from "dotenv";
configDotenv()
// import cors from "cors"

const app=express();

import {createServer} from "http"
 const myHttpServer=createServer(app)


import {Server} from "socket.io"
const io =new Server(myHttpServer,{
    cors:{
        origin: [process.env.FRONTEND_URL],
    
    }
})


io.on("connection",(socket)=>{
    console.log("socket connected:-",socket.id)
    const {userId}=socket.handshake.query;

    if(userId){
        socket.join(userId);
    }

    socket.on("join-singleResource-room",(resourceId)=>{
        socket.join(resourceId)
    })

    socket.on("leave-singleResource-room",(resourceId)=>{
        socket.leave(resourceId)
    })

    socket.on("disconnect",()=>{
        console.log("socket disconnected",socket.id)
    })
})



export {io,app,myHttpServer}