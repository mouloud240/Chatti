const express=require('express')
const {query,validationResult, body}=require("express-validator")
const router=express.Router()
const bcrypt=require('bcrypt')
const UserModel = require('../../db/userScheme')
async function findUserByEmail (UserEmail){
  try{
    const user=await UserModel.findOne({email:UserEmail})
    return user
  }catch(e){
   throw new Error(e)
  }
}
router.get('/login',[
  query('email').isEmail().withMessage('Must be an email')
  ,query('password').notEmpty().withMessage('password must not be empty')
],async(req,res)=>{
    const err=validationResult(req)
    if (!err.isEmpty()){
      res.status(400).json({errors:err.array()})
    return;
    }
   const email=req.query.email
  const password=req.query.password
  const user=await findUserByEmail(email)
    if (user){
     const match=await bcrypt.compare(password, user.password)
      if (match){
        res.status(202).send(user._id)
      }else{
        res.send("wrong pass")
      }
    }else {
     
      res.status(204).send('User not found')
      return 
    }
    
})

router.post('/signIn',[
  body("email").isEmail().withMessage('Must be a valid email!'),
  body('username').notEmpty().withMessage('must have a userName!'),
  body('password').isStrongPassword().withMessage('Weak password!')
],async (req,res)=>{
    const email=req.body.email;
    const userName=req.body.username;
    const password=await bcrypt.hash(req.body.password,10)    
    const err=validationResult(req)
    if (!err.isEmpty()){
      res.status(400).json({errors:err.array()})
      
    }else{
      const user=new UserModel({
        email:email,
        password:password,
        userName:userName
      })
      const newUser=await user.save()
      res.send(newUser._id)
    }
  })
module.exports=router
