//this helper will accept the senderId, recveiverId and the message content and send it to the server
import axios from "axios";

export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const response = await axios.post(`${window.SERVER}/api/message`, {
      senderId,
      receiverId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
