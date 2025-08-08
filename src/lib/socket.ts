import io from "socket.io-client";

type SocketType =typeof io.Socket;


let socket: SocketType | null = null;

export const initializeSocket = (token: string): SocketType => {
  socket = io("http://localhost:3000", {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true
  });
  return socket;
};

export const getSocket = (): SocketType => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};