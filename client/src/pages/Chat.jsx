import Chatbox from "../components/Chatbox";
import OnlineUsers from "../components/OnlineUsers";
import Sidebar from "../components/Sidebar";

function Chat() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chatbox />
      <OnlineUsers />
    </div>
  );
}

export default Chat;
