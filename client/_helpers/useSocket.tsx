import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

//set this to accept anything you want to send to server
interface SocketOptions {
  userId?: number;
}

interface ServerToClientEvents {
  greeting: (data: string) => void;
}
interface ClientToServerEvents {
  load: (data: any) => void;
}

const useSocket = (options?: SocketOptions) => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  const socketListen = () => {
    if (socket) {
      socket.emit("load", options?.userId ?? "not logged in");
      socket.on("greeting", (greeting: string) => alert(greeting));
    }
  };

  useEffect(() => {
    const newSocket = io(`http://localhost:3333`);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);
  useEffect(socketListen, [socket]);

  return socket;
};

export default useSocket;
