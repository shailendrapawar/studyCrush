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




export {io,app,myHttpServer}