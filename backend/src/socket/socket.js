import express from "express"
// import cors from "cors"

const app=express();

import {createServer} from "http"
 const myHttpServer=createServer(app)


import {Server} from "socket.io"
const io =new Server(myHttpServer,{
    cors:{
        origin:["*","http://localhost:5173"],
    
    }
})


io.on("connection",(socket)=>{
    console.log("socket connected:-",socket.id)
    const {userId}=socket.handshake.query;

    if(userId){
        socket.join(userId);
        // console.log(`socket joined room ${userId}`)
    }

    socket.on("join-singleResource-room",(resourceId)=>{
        // console.log("singleResource joined",resourceId)
        socket.join(resourceId)
    })

    socket.on("leave-singleResource-room",(resourceId)=>{
        // console.log("singleResource room left",resourceId)
        socket.leave(resourceId)
    })

    socket.on("disconnect",()=>{
        console.log("scoket disconnected",socket.id)
    })
})



export {io,app,myHttpServer}