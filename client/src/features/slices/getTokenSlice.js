import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const getTokenSlice = createSlice({
  name: "getToken",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken } = getTokenSlice.actions;

export default getTokenSlice.reducer;
