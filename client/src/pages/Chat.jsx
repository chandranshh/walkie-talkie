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
  }, [socket]);

  useEffect(() => {
    socket.on("users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("users");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("newUser", (user) => {
      setOnlineUsers(user);
    });

    return () => {
      socket.off("newUser");
    };
  }, [socket]);

  useEffect(() => {
    console.log(onlineUsers);
  }, [onlineUsers]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chatbox />
      <OnlineUsers online={onlineUsers} />{" "}
      {/* Pass the updated onlineUsers to the OnlineUsers component */}
    </div>
  );
}

export default Chat;
