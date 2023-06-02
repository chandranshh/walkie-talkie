import { useSelector } from "react-redux";
import { fetchAllUsers } from "../controllers/chat/fetchUsers";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function OnlineUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
    };
    getAllUsers();
  }, []);

  // Socket.io for checking who's online
  const senderData = useSelector((state) => state.senderData);
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  if (senderData) {
    socket.emit("connected", {
      _id: senderData?._id,
      username: senderData?.username,
      email: senderData?.email,
    });
  }

  useEffect(() => {
    socket.on("users", (users) => {
      setOnlineUsers(users);
    });
    console.log(onlineUsers);
  }, []);

  return (
    <div className="w-[30%] h-full">
      <div className="h-[50%] flex flex-col">
        <div className="p-2 bg-slate-200 w-full text-center">
          <span>All user(s)</span>
        </div>
        {allUsers.map((user) => (
          <div className="p-2" key={user?._id}>
            {user?.username}
          </div>
        ))}
      </div>
      <br />
      <div className="h-[50%]">
        <div className="p-2 bg-slate-200 w-full text-center">
          <span>Online user(s)</span>
        </div>
        {onlineUsers.map((user) => (
          <div className="p-2" key={user?._id}>
            {user?.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineUsers;
