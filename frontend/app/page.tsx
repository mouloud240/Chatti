"use client"
import { useEffect, useState,} from "react"
import UseAuthStore from "./state/auth/store"
import { useRouter } from "next/navigation"
import User from "./components/user"
import axios from "axios"
export default function  Page() {
  interface userType{
    
    userName:string;
    _id:String;
    email:String
  
  }
  const router=useRouter()
  const url="http://localhost:3002/allUsers"
  const loggedState=UseAuthStore((state)=>state.logged)
  const [IsMounted,setIsMounted]=useState(false)
  const user=UseAuthStore((state)=>state.userName)
  
  const userToken=UseAuthStore((state)=>state.token)
  const setter=UseAuthStore((state)=>state.setInfo)
  const [users,setUsers]=useState<userType[]>([])
  
  useEffect(()=>{
    setIsMounted(true)
  },[])
  const handleButtonclick=()=>{

    setter("","",false)
    router.push('./pages/auth/login?id=484848')
  }

  useEffect(()=>{
      async function fetchUsers(){
      try{

    const res=await axios.get(url,{params:{token:userToken}}) 
      setUsers(res.data)
      }catch(e){
      console.log(e)
      }
  }

     fetchUsers()},[userToken])
  useEffect(()=>{
    if (!loggedState){
    router.push("./pages/auth/login?id=dkcdk784")
    } 
  },[loggedState, router])
  if (!IsMounted){
    return null
  }
  return (
    <>
      {
        loggedState&&(<div>   Welcome to the home page Mr.{user}



 
          <button className=" ml-4 bg-blue-500 text-white rounded-lg p-4" onClick={()=>{handleButtonclick()}} >Logout</button>
       <div>
            <ul className="flex flex-col gap-4">
              {
              
                users.map((user,index)=>(
                <li key={index}>
                    <User name={user.userName} id={user._id}/>
                  </li>
                ))
              }
            </ul>

          </div> 

        </div>


        )

      }
  </>
  )
}

