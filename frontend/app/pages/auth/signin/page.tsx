"use client"
import { useForm } from "react-hook-form"
import styles from "./page.module.css"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import UseAuthStore from "@/app/state/auth/store"
import Image from "next/image"
function Page (){
  const {register,handleSubmit,formState:{errors}}=useForm()
  const router=useRouter()
  const setter=UseAuthStore((state)=>state.setInfo)
    const inputStyle="bg-gray-400 rounded-xl text-gray-800 p-4 flex items-center  font-bold ring-gray-50 ring-2 focus:ring-2 focus:ring-blue-300 placeholder:text-gray-800"
    const handleSignin=async (data:any)=>{
    try{
 const res=await axios.post('http://localhost:3002/signIn',{
      username:data.username,
      email:data.email,
      password:data.password
    })
    const info=res.data
    if (info){

    setter(info.token,info.username,true)
     router.push('/')
      
      }
    
    }catch(e){
     alert(e)      
    }
   
  }
  return (
    <div className={styles.main}>
      <div className="flex items-center justify-center">

      
      <div className="flex bg-white bg-opacity-60 rounded-2xl py-16 px-36 flex-col items-center justify-around shadow-sm ">
          <button onClick={()=>{router.back()}} className="">
              <Image src='/assets/icons/back.svg' alt="back" height={30} width={30}/>


              
            </button>

          <div className="flex  items-center mb-10"> 
                       <h1 className="text-gray-800 text-3xl font-bold  ">
            Create new Account
          </h1>
          </div>        <form onSubmit={handleSubmit(handleSignin)} className="flex flex-col gap-6  ">
        <input className={inputStyle} placeholder="username" {...register("username")} type="text"/>
        <input className={inputStyle} placeholder="email" {...register("email")} type="text"/>
        <input className={inputStyle}type="password" placeholder="password" {...register('password')}/>
        <input className={inputStyle}type="password" placeholder="confirm password" {...register('confirm password')}/>
         <button type="submit" className="flex items-center justify-center px-10 p-4 text-xl font-bold text-white rounded-xl bg-blue-500">Sign in</button>   
         
        </form>
      </div>
 
</div>
</div>
  )
}

export default Page
