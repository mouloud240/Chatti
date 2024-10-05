"use client"
//I'm sorry in advance for anyone going to read varibles name
import Chat from "@/app/components/chat"
import UseAuthStore from "@/app/state/auth/store"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { EventType } from "react-hook-form"
import { io, Socket } from "socket.io-client"

const Page = () => {
  type Message = {
  sender_Id: String;
  body: string;
};
  const params=useSearchParams()
  const receiverId=params.get('uid')
  const currRoomName=params.get('username')
  const accountName=currRoomName
  const userId=UseAuthStore((state)=>state.token)
  const url=`http://localhost:3002/roomMessages?token=${userId}&room=${receiverId}`
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
    newSocket.emit('enter-chat',receiverId)
    newSocket.on('rec',(msg)=>{
      setMessages(prevmessage=>[...prevmessage,msg])
    })
    return ()=>{newSocket.disconnect()}
  },[receiverId, userId])
  const handleSendMessage= useCallback(function handleButtonClick(){
    let sendId=userId+receiverId!;
    sendId=sendId.split('').sort().join('')

    if (socket){
      socket.emit('send',{body:Currmessage,sender_Id:userId},sendId)

      const msg:Message= {sender_Id:userId,body:Currmessage}
       setMessages(prev=>[...prev,msg]) 
    }
    setCurrMessage('')
  },[Currmessage, receiverId, socket, userId])
  

  useEffect(()=>{
    const handleEventListner=(event:KeyboardEvent)=>{
      event.stopPropagation()
      if (event.key=="Enter"){
        event.preventDefault()
        console.log("Enter pressed")
        if (Currmessage==""){
        return;
        }
       handleSendMessage()   
        return;
      }
    }
    window.addEventListener("keyup",handleEventListner)
    return ()=>window.removeEventListener('keyup',handleEventListner)
  },[Currmessage, handleSendMessage])
   return (
    <div>
      <div className="flex justify-between px-4">
        <Link href={'/'}><Image src={"/assets/icons/back.svg"} width={40} height={30} alt="back"/>
        </Link>

      <p className="text-xl self-center mx-auto font-bold text-white">
        {accountName}
      </p>
      </div>

      <ul>
        {
          messages.map((item,index)=>{
            let style="text-white font-semibold flex px-10 py-2 "

            if (item.sender_Id==userId){
              style=style+" justify-end"
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
       <button onClick={()=>{handleSendMessage()}} className="bg-gray-500 font-semibold text-white text-xl rounded-xl p-4 px-8">Send</button> 
      </div> 

    </div>
  )
}

export default Page
