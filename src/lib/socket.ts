import io from "socket.io-client";

type SocketType =typeof io.Socket;


let socket: SocketType | null = null;

export const initializeSocket = (token: string): SocketType => {
  socket = io("https://ff0f87b6-674b-4117-8323-a06875603259-00-16iv0uh6aaigq.pike.repl.co/", {
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