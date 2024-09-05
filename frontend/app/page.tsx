"use client"

import { useEffect,} from "react"
import UseAuthStore from "./state/auth/store"
import { useRouter } from "next/navigation"
export default function  Page() {
  const router=useRouter()
  const loggedState=UseAuthStore((state)=>state.logged)
const token=UseAuthStore((state)=>state.token)
  const user=UseAuthStore((state)=>state.userName)
  const setter=UseAuthStore((state)=>state.setInfo)
  const handleButtonclick=()=>{
    setter("","",false)
    router.push('./pages/auth/login/')
  }
  useEffect(()=>{
    if (!loggedState){
    router.push("./pages/auth/login/")
    } 
  },[loggedState, router])
  return (
    <div>
      {
        loggedState&&<div>   Welcome to the home page Mr.{user} with the token {token}


           <button className="bg-blue-500 text-white rounde-lg p-4" onClick={()=>{handleButtonclick()}} >Logout</button>
        </div>
      }
  </div>
  )
}

