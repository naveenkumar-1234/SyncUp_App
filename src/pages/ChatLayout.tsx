import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import {useSocket} from '@/lib/useSocket'

interface Message {
  _id: string
  sender: string
  senderUsername: string
  content: string
  createdAt: string
}

const ChatLayout = () => {
  const { user, logout } = useAuth()
  const socket = useSocket()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const roomId = 'general'

   useEffect(() => {
    if (!socket || !user) return;

    const handleRoomHistory = (history: Message[]) => {
      setMessages(history);
    };

    const handleNewMessage = (message: Message) => {
      console.log(message);
      console.log("workkking");
      
      
      setMessages(prev => [...prev, message]);
    };

    const handleError = (error: { message: string }) => {
      console.error('Socket error:', error.message);
    };

    socket.emit('joinRoom', roomId);
    socket.on('roomHistory', handleRoomHistory);
    socket.on('newMessage', handleNewMessage);
    socket.on('error', handleError);

    return () => {
      socket.off('roomHistory', handleRoomHistory);
      socket.off('newMessage', handleNewMessage);
      socket.off('error', handleError);
      socket.emit('leaveRoom', roomId);
    };
  }, [socket, user]);
  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return
    socket.emit('sendMessage', { roomId, content: messageInput })
    setMessageInput('')
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-bold">Chat App</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src={} /> */}
              <AvatarFallback>
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{user?.username}</span>
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          {messages.map(message => (
            <div key={message._id} className="mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.senderUsername?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{message.senderUsername}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="mt-1 ml-10">{message.content}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  )
}

export default ChatLayout