const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const UserSchema=new Schema({
   email:{
    type:String,
    required:true
  },
  userName:{
    type:String,
    required:false
  },
  password:{
    type:String,
    require:true
  }
})
const UserModel=mongoose.model("User",UserSchema)
module.exports=UserModel
