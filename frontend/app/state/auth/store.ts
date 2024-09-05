import { create } from "zustand";
import { persist } from "zustand/middleware";
interface user{
  token:String;
  userName:String;
  logged:boolean;
  setInfo:(token:String,userName:String,logged:boolean)=>void
}

const UseAuthStore=create<user>(
  (set)=>({
   token:"",
    userName:"",
    logged:false,
    setInfo:(token,userName,logged)=>set((state)=>({token:token,logged:logged,userName:userName}))
  })
)
export default UseAuthStore
