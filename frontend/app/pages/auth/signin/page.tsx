"use client"
import { useForm } from "react-hook-form"
import styles from "./page.module.css"
function Page (){
  const {register,handleSubmit,formState:{errors}}=useForm()
    const inputStyle="bg-gray-400 rounded-xl text-gray-800 p-4 flex items-center  font-bold ring-gray-50 ring-2 focus:ring-2 focus:ring-blue-300 placeholder:text-gray-800"
  const handleSignin=(data)=>{
    console.log(data)
  }
  return (
    <div className={styles.main}>
      <div className="flex items-center justify-center">

      
      <div className="flex bg-white bg-opacity-60 rounded-lg p-10 flex-col items-center justify-around shadow-sm ">
       <h1 className="text-gray-800 text-3xl font-bold mb-10 ">
          Create new Account
        </h1>
        <form onSubmit={handleSubmit(handleSignin)} className="flex flex-col gap-4 ">
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
