const express=require('express')
const Mrouter=express.Router()
const {query,validationResult}=require('express-validator')
const UserModel = require('../../db/userScheme')
const roomModel = require('../../db/roomSchema')
async function findUserwithID(id){
  try{
 const user=await UserModel.findById(id)
  if (user){
    return true
    }}catch(e){
    console.log(e)
      }
    

  return false
  }
Mrouter.get('/allUsers',[
  query('token').isMongoId().withMessage('Must provide a valid  token')
],async (req,res)=>{
  const token=req.query.token
    if (! await findUserwithID(token)){
      res.status(400).send('Token Error')
      return 
    }

    const users=await UserModel.find()

    res.send(users)
})
Mrouter.get('/roomMessages',[
query('token').notEmpty().withMessage('Provide a valid token'),
query('room').notEmpty().withMessage('Provide a room')
],async (req,res)=>{
    const token=req.query.token
    const room=req.query.room
    if (! await findUserwithID(token)){
     res.status(400).send('Token error')
    return;}
    const currRoom=await roomModel.findOne({_id:room+token})
    if (currRoom){
      res.send(currRoom.messages)
      return 
    }else{
      const Newroom=new roomModel({
        _id:room+token,
        messages:[]
      })
      await Newroom.save()
      res.send([])
    }
  })

module.exports=Mrouter 
