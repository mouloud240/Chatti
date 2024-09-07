"use client"
//I'm sorry in advance for anyone going to read varibles name
import Chat from "@/app/components/chat"
import UseAuthStore from "@/app/state/auth/store"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

const Page = () => {
  type Message = {
  sender_Id: String;
  body: string;
};
  const params=useSearchParams()
  const receiverId=params.get('uid')
  const userId=UseAuthStore((state)=>state.token)
  const url=`http://localhost:3002/roomMessages?token=${userId}&room=${receiverId}`
  const [messages,setMessages]=useState<Message[]>([])
  const [Currmessage,setCurrMessage]=useState('')
  const [socket,setSocket]=useState<Socket|null>(null)
   useEffect(()=>{
    async function fetchMessages(){
      const res=await axios.get(url)
      console.log(res.data)
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
    newSocket.emit('enter-chat',receiverId)
    newSocket.on('rec',(msg)=>{
      setMessages(prevmessage=>[...prevmessage,msg])
    })
    return ()=>{newSocket.disconnect()}
  },[receiverId, userId])
  function handleButtonClick(){
    console.log(Currmessage)
    if (socket){
      socket.emit('send',{body:Currmessage,sender_Id:userId},receiverId!>userId?userId+receiverId!:receiverId!+userId)

      const msg:Message= {sender_Id:userId,body:Currmessage}
       setMessages(prev=>[...prev,msg]) 
    }
    setCurrMessage('')
  }
  return (
    <div>
      <ul>
        {
          messages.map((item,index)=>{
            let style="text-white font-semibold flex px-10 py-2 "

            console.log(item.sender_Id)
            if (item.sender_Id==userId){
              console.log('end put')
              style=style+" justify-end"
              console.log(style)
            }
             return (
            <li key={index} className={style}>
             <Chat message={item.body} />
              </li>
          ) })
        }
      </ul>
      <div className="flex justify-center gap-4 p-10">
        <input value={Currmessage} type="text" onChange={(e)=>{setCurrMessage(e.target.value)}} className="px-96 py-4 text-black bg-white rounded-lg text-xl " />
       <button onClick={()=>{handleButtonClick()}} className="bg-gray-500 font-semibold text-white text-xl rounded-xl p-4 px-8">Send</button> 
      </div> 

    </div>
  )
}

export default Page
