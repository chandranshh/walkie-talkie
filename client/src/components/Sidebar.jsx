// Sidebar.js
import { useDispatch, useSelector } from "react-redux";
import { setLogoutState } from "../features/slices/senderDataSlice";
import { logoutToken } from "../features/slices/getTokenSlice";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { fetchConversation } from "../controllers/chat/fetchConversation";
import { useEffect, useState } from "react";
import { setReceiverData } from "../features/slices/setReceiverData";

function Sidebar() {
  const senderData = useSelector((state) => state.senderData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allConvo, setAllConvo] = useState([]);

  const setLogoutHandler = () => {
    dispatch(setLogoutState());
    dispatch(logoutToken());
    socket.emit("logout", senderData);
    navigate("/register");
    socket.disconnect();
  };
  useEffect(() => {
    const fetchData = async () => {
      const conversations = await fetchConversation(senderData?._id);
      setAllConvo(conversations);
    };

    fetchData();
  }, [senderData]);

  return (
    <div className="w-[30%] h-[97vh] flex flex-col justify-center ml-2 mt-2">
      <div className="p-1 bg-slate-200 w-full h-[6%] flex justify-between">
        <div className="p-1">Hello, {senderData?.username}</div>
        <button className="p-1" onClick={setLogoutHandler}>
          Logout
        </button>
      </div>
      <div className="h-full ">
        <div className="p-2 py-4 bg-slate-200 w-full text-center">
          <span>Message(s)</span>
        </div>
        {allConvo.map((convo) => (
          <div
            className="p-3 bg-gray-100 my-3 rounded-md shadow-sm ml-2 cursor-pointer"
            key={convo.user._id}
            onClick={() => dispatch(setReceiverData(convo))}
          >
            {convo.user.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
