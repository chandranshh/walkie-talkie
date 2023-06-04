import { useDispatch, useSelector } from "react-redux";
import { checkConvo } from "../controllers/chat/checkConvo";
import { useEffect } from "react";

function Chatbox() {
  const { receiverData, sideBarUser } = useSelector(
    (state) => state.receiverData
  );
  const { roomData } = useSelector((state) => state); // Assuming roomData is stored directly in the state

  const dispatch = useDispatch();

  const senderData = useSelector((state) => state.senderData);
  const roomId = receiverData?.roomId || roomData?.roomId;
  useEffect(() => {
    dispatch({ type: "setRoomData/useSetRoomData", payload: roomId });
  }, [roomId]);

  return (
    <div className="w-[80%] h-[97vh] bg-blue-100 mx-2 flex flex-col items-center mt-2">
      <div className="w-[98%] h-14 bg-white mt-3 rounded-md p-2 flex items-center">
        {`It's you're bae, ${
          receiverData ? receiverData?.user?.username : sideBarUser?.username
        }`}
      </div>
      <div className="h-[95%] w-[98%] mx-2 mt-2 px-2 flex justify-center bg-white rounded-md overflow-y-auto">
        <div className="w-full h-full mt-3">
          <div className="flex justify-start">
            <div className="bg-blue-500 max-w-[48%] m-2 p-2 rounded-md text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              natus eos porro. Tenetur dicta ex velit illum minima quos officia?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-200 max-w-[49%] m-2 p-2 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A minus
              neque, aperiam architecto suscipit officiis?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-blue-500 max-w-[48%] m-2 p-2 rounded-md text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              natus eos porro. Tenetur dicta ex velit illum minima quos officia?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-200 max-w-[49%] m-2 p-2 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A minus
              neque, aperiam architecto suscipit officiis?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-blue-500 max-w-[48%] m-2 p-2 rounded-md text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              natus eos porro. Tenetur dicta ex velit illum minima quos officia?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-200 max-w-[49%] m-2 p-2 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A minus
              neque, aperiam architecto suscipit officiis?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-blue-500 max-w-[48%] m-2 p-2 rounded-md  text-white">
              Hello
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-200 max-w-[49%] m-2 p-2 rounded-md">
              How are you?
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full justify-center mt-2 mb-2">
        <input
          className="w-[98%] h-14 rounded-lg text-gray-800 px-2 py-1"
          type="text"
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
}

export default Chatbox;
