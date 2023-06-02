import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import OnlineUsers from "../components/OnlineUsers";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { socket } from "../socket";

function Chat() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const senderData = useSelector((state) => state.senderData);

  useEffect(() => {
    socket.emit("connected", senderData);
    socket.on("users", (users) => {
      setOnlineUsers(users);
    });
  }, [socket]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chatbox />
      <OnlineUsers />
    </div>
  );
}

export default Chat;
