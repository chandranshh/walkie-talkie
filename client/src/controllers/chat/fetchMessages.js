//this helper fetches the messages from the server and stores them in the state
import axios from "axios";

export const fetchMessages = async (roomId) => {
  try {
    const response = await axios.get(`${window.SERVER}/api/message/${roomId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
