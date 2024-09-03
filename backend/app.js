const port=3001
const io=require('socket.io')(port,{
  cors:{
 origin:["htpp://localhost:3000"]
}
})

io.on('connection',()=>{
  console.log('connected!')
})
