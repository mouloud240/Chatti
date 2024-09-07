"use client"

import UseAuthStore from "@/app/state/auth/store"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

const Page = () => {
  type Message = {
  senderId: String;
  body: string;
};
  const params=useSearchParams()
  const uid=params.get('uid')
  const userId=UseAuthStore((state)=>state.token)
  const url=`http://localhost:3002/roomMessages?token=${userId}&room=${uid}`
  const [messages,setMessages]=useState<Message[]>([])
  const [Currmessage,setCurrMessage]=useState('')
  const [socket,setSocket]=useState<Socket|null>(null)
   useEffect(()=>{
    async function fetchMessages(){
      const res=await axios.get(url)
      setMessages(res.data)
    }
    fetchMessages()
  },[url])
  useEffect(()=>{
    const newSocket=io(`localhost:3001/user`,{auth:{id:userId}})
    newSocket.on('connect',()=>{
      console.log('connected')

      setSocket(newSocket)
    })
    newSocket.emit('enter-chat',uid)
    newSocket.on('rec',(msg)=>{
      setMessages(prevmessage=>[...prevmessage,msg])
    })
    return ()=>{newSocket.disconnect()}
  },[uid, userId])
  function handleButtonClick(){
    console.log(Currmessage)
    if (socket){
      socket.emit('send',{body:Currmessage,senderId:userId},uid!+userId)
      const msg:Message= {senderId:userId,body:Currmessage}
       setMessages(prev=>[...prev,msg]) 
    }
    setCurrMessage('')
  }
  return (
    <div>
      <ul>
        {
          messages.map((item,index)=>{
            let style="text-white font-semibold mx-auto flex"
            console.log(item.senderId)
            if (item.senderId==userId){
              
              style+="justify-end"
            }
             return (
            <li key={index} className={style}>
              <p>{item.body}</p>
            </li>
          ) })
        }
      </ul>
      <div className="flex gap-4 p-10">
        <input value={Currmessage} type="text" onChange={(e)=>{setCurrMessage(e.target.value)}} className="px-10 py-4 text-black bg-white rounded-lg text-xl " />
       <button onClick={()=>{handleButtonClick()}} className="bg-gray-500 font-semibold text-white text-xl rounded-xl p-4 px-8">Send</button> 
      </div> 

    </div>
  )
}

export default Page
