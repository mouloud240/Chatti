const mongoose=require('mongoose')
const express=require('express')
const dotnev=require('dotenv').config()
const authRoutes=require('./ApiRouters/auth/authRoutes')
const UserModel = require('./db/userScheme')
const roomModel = require('./db/roomSchema')
const Mrouter = require('./ApiRouters/messages/routes')
const cors=require('cors')
const socketPort=3001
const htppsPort=3002
const app=express()
app.listen(htppsPort,()=>{
  console.log("Listening on port: "+htppsPort)
})
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(authRoutes)
app.use(Mrouter)
let id=""
const dbUrl=dotnev.parsed.uri
const io=require('socket.io')(socketPort,{
  cors:{
 origin:["http://localhost:3000"]
}
})
async function findRoom(id){
  const room=await roomModel.findOne({_id:id})
  return room
}
mongoose.connect(dbUrl,{w:"majority"}).then(()=>{console.log('connected to db')})
const userIo=io.of('/user')
userIo.on('connection',socket=>{
  console.log('Connected with user')
  socket.on('enter-chat',async receiverId=>{
    const roomId=receiverId>id? id+receiverId:id+receiverId
    const currRoom=await findRoom(roomId)
    if (!currRoom){
     const saveRoom=new roomModel({_id:roomId,messages:[]})
      saveRoom.save()
    }
    
    socket.join(roomId)
  })
  socket.on('send',async (msg,room)=>{
    if (room!=""){
      socket.to(room).emit('rec',msg)
     await roomModel.updateOne({_id:room},{$push:{messages:msg}},
     
      ).then(()=>{}).catch((e)=>console.log(e)) 
    }
  })
})
 
async function checkId (id) {
  const user=await UserModel.findById(id)
  if (user){
    return true
  }else {
    return false
  }
}
userIo.use(async (socket,next)=>{
  if(await checkId(socket.handshake.auth.id)){
    id=socket.handshake.auth.id
    next()
  }else {
    throw new  Error("id Doesn't Exist")
  }
})
io.on('connection',()=>{
})
