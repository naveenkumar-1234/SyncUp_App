import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import {useSocket} from '@/lib/useSocket'
import NavSecion from './section/NavSection'
import RoomSection  from "@/pages/section/RoomSection"
import MessageComponent from './components/MessageComponent'
// import axios from 'axios'


export interface Message {
  _id: string
  sender: string
  senderUsername: string
  content: string
  createdAt: string
}
export interface Room {
  _id: string;
  roomName: string;
  roomCreator: string;
  messages: string[];
  users: string[];
  isPrivate: boolean;
  createdAt: string;
}
const HomeLayout = () => {
  const { user, logout ,isSocketConnected } = useAuth()
  const socket = useSocket()
  const [selectedRoom , setSelectedRoom] = useState<Room | null>(null);
  const [roomMessages , setRoomMessages] = useState<Message[]>([]);
  // const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')

  const [ isLoading , setLoading] = useState(false)

  const [rooms , setRooms] = useState<Room[]>([])
  
  const roomId = 'general'

   useEffect(() => {
    if (!socket || !isSocketConnected || !user?.id) {
      console.log('Waiting for socket connection...');
      return;
    }
    console.log("socket is ready",socket.id)

    // if (!socket || !user) return;

    const fetchRooms = async () =>{
      try {

        setLoading(true)
        const response = await fetch(`http://localhost:3000/api/user/${user.id}/rooms`,{
          method:"GET"
        })
        // console.log("usednej")
        const data = await response.json();
        setRooms(data)
        // console.log();
        console.log(data);
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
      



    fetchRooms()
    // fetchRooms()
    // console.log("sdsd");
    

  //   const handleRoomHistory = (history: Message[]) => {
  //     setMessages(history);
  //   };

  //   const handleNewMessage = (message: Message) => {
  //     console.log(message);
  //     console.log("workkking");
      
  //     setMessages(prev => [...prev, message]);
  //   };

  //   const handleError = (error: { message: string }) => {
  //     console.error('Socket error:', error.message);
  //   };

  //   socket.emit('joinRoom', roomId);
  //   socket.on('roomHistory', handleRoomHistory);
  //   socket.on('newMessage', handleNewMessage);
  //   socket.on('error', handleError);

  //   return () => {
  //     socket.off('roomHistory', handleRoomHistory);
  //     socket.off('newMessage', handleNewMessage);
  //     socket.off('error', handleError);
  //     socket.emit('leaveRoom', roomId);
  //   };


  // console.log("Sdsdsdsdsdsd");

  return()=>{
    // socket.off("")
  }
  
  }, [user,socket,isSocketConnected]);

  const handleHistroy = () =>{
    console.log("in handle histroy ")
  }

  useEffect(()=>{
    if (!socket || !isSocketConnected || !user?.id) {
      // console.log('Waiting for socket connection...');
      return;
    }
    console.log("in useefect of room selection")
    socket?.emit("joinRoom",selectedRoom?._id)
    console.log("joined in room ",selectedRoom?.roomName)

    socket.emit('roomHistroy',handleHistroy);




    const fetchMessage = async() => {
      const roomId = selectedRoom?._id;
      try {
        const response = await fetch(`http://localhost:3000/api/rooms/${roomId}/messages`)
        const data = response.json();
        // setRoomMessages();
      } catch (error) {

        console.log(error);
        
        
      }
    }

    return()=>{
      if(selectedRoom?._id){
        console.log("leaving from room ",selectedRoom.roomName);
        socket.emit('leaveRoom',selectedRoom._id)
        
      }
    }

  },[selectedRoom])

  useEffect(()=>{
    if (!socket || !isSocketConnected || !user?.id) {
      // console.log('Waiting for socket connection...');
      return;
    }
    // else{
    //   console.log("message use effect")
    // }
    console.log("in message useEffect")
    
    
    
    const handleMessage = (mess : Message)=>{
      console.log("skksd in handle")
      // console.log(roomMessages);
      
      console.log("message received or sended to room")
      console.log(mess)
      setRoomMessages(prev => [...prev,mess])
      console.log(roomMessages);
      
    }
    socket.on("newMessage",handleMessage)
  },[socket,selectedRoom])
  // const handleRoomSection = (room: Room) =>{  
  //     setSelectedRoom(room)
  // }
  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return

    const newMessage = {
        roomId : selectedRoom?._id,
        content : messageInput,
        user:{
          id: user?.id,
          username : user?.username
        }
      }
      

      socket.emit('sendMessage', newMessage)
    
    setMessageInput('')
    // console.log("sddsdsds");
    
    
  }

  return (
    <div className="flex h-screen flex-col bg-gray-300">
      {/* Header */}
      <NavSecion  user={user} logout={logout} />

      <div className='flex '>
        {/* room section */}
          <div className='rooms h-[90vh] w-1/5 bg-gray-100'>
          
          {/* { isLoading ? <>no rooms</> : ()} */}
          <RoomSection  selectedRoom={selectedRoom} isLoading={isLoading} rooms={rooms} setSelectedRoom={setSelectedRoom} />
          
        
          </div>

          {/* chat section */}
          <div className='flex  flex-col justify-between   w-4/5 '>

          {/* messages */}
                <div className='bg-gray-200 h-full'>
                    <MessageComponent roomMessages={roomMessages} />
                  </div>


                 {/* Message Input */}
      <div className="border-t p-2  bottom-0 ">
        <div className="flex gap-2">
          <Input
          className='bg-gray-200'
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <Button className='bg-blue-500  text-white' onClick={sendMessage}>Send</Button>
        </div>
      </div>
          
          </div>

      </div>
      
    </div>
  )
}

export default HomeLayout