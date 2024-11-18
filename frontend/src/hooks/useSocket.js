// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

// const SOCKET_SERVER_URL = "https://chatapp-v2-3.onrender.com";

const SOCKET_SERVER_URL = "http://localhost:8000";

// Create a socket instance outside the hook to ensure it's reused
let socket;

const useSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, { autoConnect: false });
  }

  useEffect(() => {
    // Connect on load if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      // Disconnect socket when the component using it unmounts
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return socket;
};

export default useSocket;
