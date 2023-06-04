/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { fetchAllUsers } from "../controllers/chat/fetchUsers";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { setSideBarUser } from "../features/slices/setReceiverData";
import { useDispatch } from "react-redux";
import { checkConvo } from "../controllers/chat/checkConvo";

function OnlineUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const senderData = useSelector((state) => state.senderData);
  const [recepientData, setRecepientData] = useState(null);

  const dispatch = useDispatch();

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

  const onClickHandler = async (user) => {
    dispatch(setSideBarUser(user));
    setRecepientData(user);
    const roomData = await checkConvo(senderData?._id, user?._id);
    dispatch({ type: "setRoomData/useSetRoomData", payload: roomData?.roomId });
  };

  return (
    <div className="w-[30%] h-[97vh]">
      <div className="h-[48%] flex flex-col">
        <div className="p-2 mt-2 bg-slate-200 w-[98%] text-center">
          <span>All user(s)</span>
        </div>
        <div className="overflow-y-scroll h-full">
          {allUsers
            .filter((user) => user._id !== senderData?._id) // Filter out senderData._id users
            .map((user) => (
              <div
                className="p-3 bg-gray-100 my-3 rounded-md shadow-sm mr-3 cursor-pointer"
                key={user?._id}
                onClick={() => onClickHandler(user)}
              >
                {user?.username}
              </div>
            ))}
        </div>
      </div>
      <br />
      <div className="h-[48%]">
        <div className="p-2 mt-2 mr-12 bg-slate-200 w-[98%] text-center">
          <span>Online user(s)</span>
        </div>
        <div>
          {onlineUsers
            .filter((user) => user._id !== senderData?._id) // Filter out senderData._id users
            .map((user) => (
              <div
                className="p-3 bg-gray-100 my-3 rounded-md shadow-sm mr-2 cursor-pointer"
                key={user?._id}
                onClick={() => onClickHandler(user)}
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
