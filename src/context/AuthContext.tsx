import { initializeSocket,getSocket,disconnectSocket } from '@/lib/socket';
import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  socket: ReturnType<typeof getSocket> | null;
  getLocalUser: () => void;
  isSocketConnected: boolean
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  
   useEffect(() => {
    // let socketInstance: ReturnType<typeof getSocket> | null = null;
    // console.log("in socket useeffect");
    if(!user?.token) {
      console.log("user dont have token")
      return
    }

    
      // console.log("user token if socket");
      
    try {
      const newSocket = initializeSocket(user.token);

      newSocket.on("connect",()=>{
        setIsSocketConnected(true);
        console.log("socket connected in auth provider")
      })
       newSocket.on('disconnect', () => {
       setIsSocketConnected(false);
  });
      setSocket(newSocket);
      console.log("socket setted")

      return () => {
        newSocket.off('connect');
        newSocket.off('disconnect');
        // console.log("in effect of socket init , disconnecting");
        
        disconnectSocket();
      };
    } catch (err) {
      console.error("Failed to initialize socket:", err);
    }
  
  } ,[user?.token]);

  useEffect(()=>{

    const loadUser = () =>{
      try {
        const token = localStorage.getItem('token');
        const existingUser = localStorage.getItem('user');
        if(token && existingUser){
          const userData = JSON.parse(existingUser);
          setUser({
            id: userData.id,
          username: userData.username,
          email: userData.email,
          token: token
          })
        }
        
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
      logout();
        
      }
    }
    loadUser()
  },[])

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        token: data.token
      });
      
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success('Registration successful');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };
  // const getLocalUser = () => {
  //   const existingUser =  localStorage.getItem('user');
  //   const token : string | null = localStorage.getItem('token');

  //   console.log(existingUser?.username);
  //   console.log(existingUser?.email);
  //   console.log(token);
    
    

  // }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        token: data.token
      });
      
      localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

      toast.success('Login successful');
    } catch (error) {
      toast.error('Login failed');
      throw error;
    }
  };

  const logout = () => {
    if (socket) {
      socket.disconnect();
    }
    setUser(null);
    localStorage.removeItem("token");
    toast('Logged out successfully');
  };
  const getLocalUser = () => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};
  return (
    <AuthContext.Provider value={{ user, login, register, logout, socket , getLocalUser  , isSocketConnected}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}