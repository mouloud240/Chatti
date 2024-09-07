import UseAuthStore from "../state/auth/store";
interface chatProps{
  message:String
}

const Chat = ({message}:chatProps) => {
  return (
    <div className="bg-gray-500 rounded-xl p-6 m-2 shadow-sm">{message}</div>
  )
}

export default Chat
