import { useEffect, useState } from "react";
import { getSocket } from "./socket";
import { useAuth } from "@/context/AuthContext";

export const useSocket = () => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(null);

  useEffect(() => {
    if (!user?.token) return;

    try {
      const socketInstance = getSocket();
      setSocket(socketInstance);
    } catch (error) {
      console.error("Socket connection error:", error);
    }

    return () => {
      if (socket) {
      
      }
    };
  }, [user?.token]);

  return socket;
};