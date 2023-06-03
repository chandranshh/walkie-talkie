// Sidebar.js
import { useDispatch, useSelector } from "react-redux";
import { setLogoutState } from "../features/slices/senderDataSlice";
import { logoutToken } from "../features/slices/getTokenSlice";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

function Sidebar() {
  const senderData = useSelector((state) => state.senderData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setLogoutHandler = () => {
    dispatch(setLogoutState());
    dispatch(logoutToken());
    socket.emit("logout", senderData);
    socket.disconnect();
    navigate("/register");
  };

  return (
    <div className="w-[30%] h-full flex flex-col justify-center">
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
      </div>
    </div>
  );
}

export default Sidebar;
