const mongoose=require('mongoose')
const express=require('express')
const dotnev=require('dotenv').config()
const authRoutes=require('./ApiRouters/auth/authRoutes')
const socketPort=3001
const htppsPort=3002
const app=express()
app.listen(htppsPort,()=>{
  console.log("Listening on port: "+htppsPort)
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(authRoutes)
let id=""
const dbUrl=dotnev.parsed.uri
const io=require('socket.io')(socketPort,{
  cors:{
 origin:["http://localhost:3000"]
}
})

mongoose.connect(dbUrl).then(()=>{console.log('connected to db')})
const users=[{
  "name":"mouloud",
  "uid":"148vfvfs8s4cskeja"
}] //will bring it later from the db
const messageswithUser=[{
  "body":"Hello how are you",
  "senderId":"I'm Fine",
}]//will get it later from the db aswell
const userIo=io.of('/uid')
userIo.on('connection',socket=>{
  socket.emit('getUsers',users)
  console.log('Connected with user')
  socket.on('enter-chat',userId=>{
     socket.emit('getMessages',messageswithUser)    
    const roomId=id+userI
    socket.join(roomId)
  })
  socket.on('send',(msg,room)=>{
    if (room!=""){
      socket.to(room).emit('rec',msg)
    }
  })
})
 

userIo.use((socket,next)=>{
  if(socket.handshake.auth.id){
    console.log(socket.handshake.auth.id)
    id=socket.handshake.auth.id
    next()
  }else {
    throw new  Error("id Doesn't Exist")
  }
})
io.on('connection',()=>{
})
