//check if convo exists between two users by passing userId if not create one

import axios from "axios";

export const checkConvo = async (senderId, receiverId) => {
  try {
    const response = await axios.post(`${window.SERVER}/api/chat`, {
      senderId,
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
