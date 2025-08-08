import { useAuth } from '@/context/AuthContext'
import React from 'react'
// import {Message}  from '../HomeLayout'

interface Message {
  _id: string
  sender: string
  senderUsername: string
  content: string
  createdAt: string
}

interface messageProps{
    roomMessages:Message[]
}


const MessageComponent : React.FC<messageProps> = ({roomMessages }) => {
    const {user} = useAuth();
    console.log(user?.username);
    
  return (
    <div className=''>

        {roomMessages.length <= 0 ? <>No messages</>:(
                      <div className='flex flex-col    '>{roomMessages.map((m)=>(
                        <div key={m._id} className={` ${user?.username == m.senderUsername? `justify-end ` : ``} 
                        
                        flex gap-2  px-5 py-2 rounded-2xl`}>
                           <div className={`flex gap-2 f ${user?.username == m.senderUsername? `flex-row-reverse` :``}`}>
                             <div className={`h-10 flex items-center justify-center  rounded-full w-10 text-center border-2 bg-red-400 ${user?.username == m.senderUsername? `flex-row-reverse` :``}`}>
                                    {m.senderUsername.charAt(0).toUpperCase()}
                            </div>
                            <div className='flex bg-blue-500 text-white flex-col border-2 rounded-2xl'>
                                <div className='font-bold px-5 py-2'>{m.senderUsername}</div>
                            <div className='flex items-center justify-between px-5 py-2 w- gap-7 fit' >
                                <p className='text-md'>{m.content}</p><p className='text-sm font-light'>{new Date(m.createdAt).getHours()+ ":"+ new Date(m.createdAt).getMinutes()}</p>
                            </div>
                            </div>
                           </div>
                        </div>
                      ))} </div>
                    ) }
    </div>
  )
}

export default MessageComponent