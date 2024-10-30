// src/utils/socket.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000"; // Replace with your server URL

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false, // Prevents auto-connect for manual control
});

export default socket;
