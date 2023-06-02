import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
};
const senderDataSlice = createSlice({
  name: "senderData",
  initialState,
  reducers: {
    setSenderData: (state, action) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    setLogoutState: (state) => {
      state._id = "";
      state.email = "";
      state.username = "";
    },
  },
});

export const { setSenderData, setLogoutState } = senderDataSlice.actions;

export default senderDataSlice.reducer;
