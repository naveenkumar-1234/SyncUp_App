import React from 'react'
import RoomComponent from '../components/RoomComponent';

interface Room {
  _id: string;
  roomName: string;
  roomCreator: string;
  messages: string[];
  users: string[];
  isPrivate: boolean;
  createdAt: string;
}
interface RoomSectionProps {
  isLoading: boolean;
  rooms: Room[];
  setSelectedRoom: (room: Room) => void;
  selectedRoom:Room | null;
}

const RoomSection : React.FC<RoomSectionProps> = ({isLoading,rooms,setSelectedRoom,selectedRoom}) => {
  return (
    <div className='flex flex-col gap-2 py-1 px-2 '>
        {isLoading ? (
    <div>Loading rooms...</div>
  ) : rooms.length > 0 ? (
    rooms.map((room) => (
      <RoomComponent setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom} room={room} key={room._id} roomId={room._id} roomName={room.roomName} />
    ))
  ) : (
    <div>No rooms available</div>
  )}
    </div>
  )
}

export default RoomSection