import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMessages } from "../controllers/chat/fetchMessages";
import { sendMessage } from "../controllers/chat/sendMessage";
import { socket } from "../socket";

function Chatbox() {
  const { receiverData, sideBarUser } = useSelector(
    (state) => state.receiverData
  );
  const { roomData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const senderData = useSelector((state) => state.senderData);
  const roomId = receiverData?.roomId || roomData?.roomId;

  const [messages, setMessages] = useState([]);
  const [typeMessage, setTypeMessage] = useState("");

  useEffect(() => {
    dispatch({ type: "setRoomData/useSetRoomData", payload: roomId });
  }, [roomId]);

  const reduxRoomId = useSelector((state) => state.roomData.roomId);

  useEffect(() => {
    const fetchMessagesData = async () => {
      const fetchedMessages = await fetchMessages(reduxRoomId);
      setMessages((prevMessages) => [...prevMessages, ...fetchedMessages]);
    };

    fetchMessagesData();
    setMessages([]);
  }, [reduxRoomId]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const sendMessageHandler = async () => {
    const newMessage = await sendMessage(
      senderData?._id,
      receiverData ? receiverData?.user?._id : sideBarUser?._id,
      typeMessage
    );
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("sendMessage", {
      sender: senderData?._id,
      receiver: receiverData ? receiverData?.user?._id : sideBarUser?._id,
      content: typeMessage,
      roomId: reduxRoomId,
    });
    setTypeMessage("");
  };

  useEffect(() => {
    socket.on(
      "newMessage",
      (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      },
      [messages]
    );

    return () => {
      socket.off("newMessage");
    };
  });

  return (
    <div className="w-[80%] h-[97vh] bg-blue-100 mx-2 flex flex-col items-center mt-2">
      <div className="w-[98%] h-14 bg-white mt-3 rounded-md p-2 flex items-center">
        {`It's your bae, ${
          receiverData ? receiverData?.user?.username : sideBarUser?.username
        }`}
      </div>
      <div className="h-[95%] w-[98%] mx-2 mt-2 px-2 flex justify-center bg-white rounded-md overflow-y-auto">
        <div className="w-full flex flex-col justify-end  mt-3">
          {messages.length === 0 ? (
            <div className="flex justify-center items-center text-gray-500 h-full ">
              Still not their friends? Send them a message and be no more a
              loner!
            </div>
          ) : (
            messages.map((message) =>
              message.sender !== senderData?._id ? (
                <div className="flex justify-start" key={message._id}>
                  <div className="bg-blue-500 max-w-[48%] m-2 p-2 rounded-md text-white">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end" key={message._id}>
                  <div className="bg-gray-200 max-w-[49%] m-2 p-2 rounded-md">
                    {message.content}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
      <div className="flex items-center w-full justify-center mt-2 mb-2">
        <input
          className="w-[98%] h-14 rounded-lg text-gray-800 px-2 py-1 ml-2"
          type="text"
          placeholder="Enter your message"
          value={typeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
        />
        <button className="p-4" onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
