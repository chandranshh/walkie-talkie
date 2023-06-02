import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import OnlineUsers from "../components/OnlineUsers";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function Chat() {
  const [onlineUsers, setOnlineUsers] = useState([]); // [user1, user2, user3

  // Socket.io for checking who's online
  const senderData = useSelector((state) => state.senderData);
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  console.log(senderData);

  useEffect(() => {
    socket.emit("connected", senderData);
  }, [senderData, socket]);

  useEffect(() => {
    socket.on("users", (users) => {
      setOnlineUsers(users);
    });
    console.log(onlineUsers);
  }, [onlineUsers, socket]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chatbox />
      <OnlineUsers key={onlineUsers._id} online={onlineUsers} />
    </div>
  );
}

export default Chat;
