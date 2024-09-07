import Image from "next/image";

interface userProps{
  name:string;
  id:string
}
const User = (props:userProps) => {
  return (
    <button className="flex gap-4 shadow-md bg-gray-500 p-4 rounded-lg w-full  ">
     <Image src={'/assets/icons/profile.svg'} height={30} width={30} alt="pfp"/>
      <div className="flex text-white text-xl font-semibold">
        {props.name}
      </div>
    </button>
  )
}

export default User
