const mongoose=require('mongoose')
const Schema=mongoose.Schema;
  const messageSchema=new Schema({
  sender_Id:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  }
},) 
module.exports=messageSchema
