import { useAuth } from "@/context/AuthContext";

export const useSocket = () => {
  const { socket } = useAuth(); 
  return socket;
};