// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5173"; // Replace with your server URL

const useSocket = () => {
  const socket = io(SOCKET_SERVER_URL);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
