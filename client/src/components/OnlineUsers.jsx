import { useSelector } from "react-redux";
import { fetchAllUsers } from "../controllers/chat/fetchUsers";
import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";

function OnlineUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const senderData = useSelector((state) => state.senderData);
  const onlineUsersDisplay = useRef([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    socket.emit("connected", senderData);
  }, [senderData]);

  useEffect(() => {
    socket.on("users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("newUser", (user) => {
      setOnlineUsers((prevUsers) => [...prevUsers, user]);
    });

    socket.on("userLeft", (userId) => {
      setOnlineUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    });

    return () => {
      socket.off("users");
      socket.off("newUser");
      socket.off("userLeft");
    };
  }, [socket]);

  useEffect(() => {
    onlineUsersDisplay.current = onlineUsers.map((user) => user);
  }, [onlineUsers]);

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
        {onlineUsersDisplay.current.map((user) => (
          <div className="p-2" key={user?._id}>
            {user?.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineUsers;
