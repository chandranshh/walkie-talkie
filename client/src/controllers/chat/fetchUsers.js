import axios from "axios";

//fetch all users from the db

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${window.SERVER}/api/users`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
