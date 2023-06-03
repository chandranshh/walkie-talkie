import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiverData: {},
};

const receiverDataSlice = createSlice({
  name: "setReceiverData",
  initialState,
  reducers: {
    setReceiverData: (state, action) => {
      state.receiverData = action.payload;
    },
  },
});

export const { setReceiverData } = receiverDataSlice.actions;

export default receiverDataSlice.reducer;
