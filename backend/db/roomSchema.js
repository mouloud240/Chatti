const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const messageSchema = require('./messageSchema');
const roomSchema=new Schema({
  _id:String,
  messages:[messageSchema]
})
const roomModel=mongoose.model('Room',roomSchema)
module.exports=roomModel
