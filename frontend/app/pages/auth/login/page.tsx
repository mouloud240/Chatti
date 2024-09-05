"use client"
import UseAuthStore from "@/app/state/auth/store"
import axios from "axios";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import styles from "./page.module.css"
import { useEffect } from "react";
import Link from "next/link";

function Page ()  {
  interface loginInterface{
    email:String;
    password:String;
  } 
  const router=useRouter()
  const {register,handleSubmit,formState:{errors}}=useForm()
  const stateSetter=UseAuthStore(state=>state.setInfo)
  const handlebuttonclick=async(data:loginInterface)=>{
    //token-username-status
    const email=data.email;
    const password=data.password;
    try{

    const res=await axios.get("http://localhost:3002/login",{params:{email:email,password:password}})
    if (res.status==202){
        const data=res.data
        stateSetter(data.token,data.username,true)
        router.push("/")
      }
    console.log(res.data)
  }
    catch(e){
     console.log(e)
    }}
  const inputStyle="bg-gray-400 rounded-xl text-white p-4 flex items-center  font-bold ring-gray-50 ring-2 focus:ring-2 focus:ring-blue-300 placeholder:text-gray-800" 
  return (

    <div className={styles.main}>
      <div className="flex  justify-center items-center">

      <div className="bg-white flex-col flex justify-center px-12 py-8 items-center bg-opacity-70 shadow-sm    rounded-xl ">
       <form onSubmit={handleSubmit(handlebuttonclick)} className="flex justify-around p-4 flex-col  items-center gap-10" >

   <h1 className="text-3xl font-bold text-gray-500">
            Login To your Account
          </h1>
          <input type="text" placeholder="email" {...register('email')} className={inputStyle}/>
          <input type="password" placeholder="password" {...register('password')} className={inputStyle}/>

        <button type="submit" className="flex items-center justify-center text-white font-bold bg-blue-500 rounded-xl  p-4 px-10 "> Log in</button>
        </form>
       <div className="flex mb-4 gap-2">
            <h2 className="font-semibold text-xl">No account?</h2> <Link href={"./signin/"}><button className="text-purple-500 font-semibold text-xl">Sign Up now</button></Link>
          </div> 
      </div> 
    </div>
      </div>
  )
}

export default Page
