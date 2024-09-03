"use client"

import { useEffect, useState } from "react"
import {io} from 'socket.io-client'
export default function  Page() {
  const [socket,SetSocket]=useState<any>(null)
  useEffect(()=>{
   const newSocket=io('http://localhost:3001/uid',{auth:{id:"1548kgf,"}})
    SetSocket(newSocket)
    newSocket.on('connect',()=>{
      console.log('connected to ws')
    })
  },[])
  const handleSend=()=>{
    if (socket){
socket.emit("rec")
      console.log(socket)
      console.log('sent')
  }else{
      console.log('Not found')
    }
  } 
  
  return (
    <div>

      <button onClick={()=>{handleSend()}}>
        send
      </button>
    </div>
  )
}

