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
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);

  
   useEffect(() => {
    if (user?.token) {
      const newSocket = initializeSocket(user.token);
      setSocket(newSocket);

      return () => {
        disconnectSocket();
      };
    }
  }, [user?.token]);

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('https://ff0f87b6-674b-4117-8323-a06875603259-00-16iv0uh6aaigq.pike.repl.co/api/register', {
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
      toast.success('Registration successful');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://ff0f87b6-674b-4117-8323-a06875603259-00-16iv0uh6aaigq.pike.repl.co/api/login', {
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

  return (
    <AuthContext.Provider value={{ user, login, register, logout, socket }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}