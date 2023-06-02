import { fetchAllUsers } from "../controllers/chat/fetchUsers";
import { useEffect, useState } from "react";

function OnlineUsers() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
    };
    getAllUsers();
  }, []);

  console.log(allUsers);

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
        <div className="p-2">Online User</div>
      </div>
    </div>
  );
}

export default OnlineUsers;
