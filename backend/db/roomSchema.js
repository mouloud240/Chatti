const mongoose=require('mongoose');
const { default: messageSchema } = require('./messageSchema');
const Schema=mongoose.Schema;
const roomSchema=new Schema({
  _id:mongoose.Types.UUID,
  messages:[messageSchema]
})
export const roomModel=mongoose.model('Room',roomSchema)
