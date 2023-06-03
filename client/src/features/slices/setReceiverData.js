import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarUser: {},
  receiverData: {},
};

const receiverDataSlice = createSlice({
  name: "setReceiverData",
  initialState,
  reducers: {
    setReceiverData: (state, action) => {
      state.receiverData = action.payload;
      state.sideBarUser = null;
    },
    setSideBarUser: (state, action) => {
      state.sideBarUser = action.payload;
      state.receiverData = null;
    },
  },
});

export const { setReceiverData, setSideBarUser } = receiverDataSlice.actions;

export default receiverDataSlice.reducer;
