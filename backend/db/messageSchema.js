const mongoose=require('mongoose')
const Schema=mongoose.Schema;
  const messageSchema=new Schema({
  senderId:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  }
},{timestamps:true}) 
export default messageSchema
