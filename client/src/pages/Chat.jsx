import { useEffect } from "react";
import Chatbox from "../components/Chatbox";
import OnlineUsers from "../components/OnlineUsers";
import Sidebar from "../components/Sidebar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

function Chat() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chatbox />
      <OnlineUsers />
    </div>
  );
}

export default Chat;
