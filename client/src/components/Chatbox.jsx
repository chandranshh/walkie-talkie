function Chatbox() {
  return (
    <div className="w-[80%] h-full bg-blue-100 mx-2 flex flex-col items-center">
      <div className="w-[98%] h-14 bg-white m-2 rounded-md p-2 flex items-center">
        Selected username will be here
      </div>
      <div className="h-[78%] w-[98%] m-2 px-2 flex justify-center bg-white rounded-md">
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
      <div className="flex items-center w-full justify-center mt-2">
        <input
          className="w-[98%] h-12 rounded-lg flex-shrink-0 text-gray-800 px-2 py-1"
          type="text"
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
}

export default Chatbox;
