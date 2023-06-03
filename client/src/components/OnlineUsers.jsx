import { useSelector } from "react-redux";
import { fetchAllUsers } from "../controllers/chat/fetchUsers";
import { useEffect, useState } from "react";
import { socket } from "../socket";

function OnlineUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const senderData = useSelector((state) => state.senderData);

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

  return (
    <div className="w-[30%] h-full">
      <div className="h-[48%] flex flex-col">
        <div className="p-2 bg-slate-200 w-full text-center">
          <span>All user(s)</span>
        </div>
        <div className="overflow-y-scroll h-full">
          {allUsers.map((user) => (
            <div
              className="p-3 bg-gray-100 my-3 rounded-md shadow-sm"
              key={user?._id}
            >
              {user?.username}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="h-[48%]">
        <div className="p-2 bg-slate-200 w-full text-center">
          <span>Online user(s)</span>
        </div>
        <div>
          {onlineUsers.map((user) => (
            <div
              className="p-3 bg-gray-100 my-3 rounded-md shadow-sm"
              key={user?._id}
            >
              {user?.username}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnlineUsers;
