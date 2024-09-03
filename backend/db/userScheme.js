const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const UserSchema=new Schema({
  uid:{
    type:String,
    required:true
  },
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
export default UserSchema;
