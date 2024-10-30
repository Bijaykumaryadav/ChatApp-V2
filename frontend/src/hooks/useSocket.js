// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

const useSocket = () => {
  const socket = io(SOCKET_SERVER_URL, { autoConnect: false });

  useEffect(() => {
    // Connect on load
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
