import express from "express"
// import cors from "cors"

const app=express();

import {createServer} from "http"
 const myHttpServer=createServer(app)


import {Server} from "socket.io"
const io =new Server(myHttpServer,{
    cors:{
        origin:["*"]
    }
})


io.on("connection",(socket)=>{
    console.log("socket connected:-",socket.id)
    const {userId}=socket.handshake.query;

    console.log(userId)

    socket.on("disconnect",()=>{
        console.log("scoket disconnected",socket.id)
    })
})



export {io,app,myHttpServer}