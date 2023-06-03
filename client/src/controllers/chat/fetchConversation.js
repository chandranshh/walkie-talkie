//get a convo between two users by passing userId
import axios from "axios";

export const fetchConversation = async (userId) => {
  try {
    const response = await axios.get(`${window.SERVER}/api/chat/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
