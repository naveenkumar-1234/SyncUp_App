interface Room {
  _id: string;
  roomName: string;
  roomCreator: string;
  messages: string[];
  users: string[];
  isPrivate: boolean;
  createdAt: string;
}
interface roomCompProps {
    roomId: string;
    roomName: string;
    setSelectedRoom :(room: Room)=> void
    room:Room
    selectedRoom:Room | null
    
}
const RoomComponent : React.FC<roomCompProps> = ({roomId , roomName,setSelectedRoom,room,selectedRoom}) => {

    const roomSelect = () =>{
        setSelectedRoom(room)
        
    }
  return (
      <div onClick={roomSelect}  className={` h-12 bg-blue-100 ${selectedRoom?._id == room._id ?` bg-blue-500 text-white font-bold  border-2 border-white ` :`text-black `} flex justify-center items-center rounded-lg cursor-pointer`} >
        {roomName}
      </div>
  )
}

export default RoomComponent