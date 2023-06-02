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
    logoutToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, logoutToken } = getTokenSlice.actions;

export default getTokenSlice.reducer;
