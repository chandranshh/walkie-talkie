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
  },
});

export const { setSenderData } = senderDataSlice.actions;

export default senderDataSlice.reducer;
