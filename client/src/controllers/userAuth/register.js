import axios from "axios";

export const register = async (email, username, password) => {
  try {
    const response = await axios.post(`${window.SERVER}/api/auth/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
