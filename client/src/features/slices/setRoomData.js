import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: "",
};

const setRoomData = createSlice({
  name: "setRoomData",
  initialState,
  reducers: {
    useSetRoomData: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { useSetRoomData } = setRoomData.actions;

export default setRoomData.reducer;
