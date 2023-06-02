import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${window.SERVER}/api/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
