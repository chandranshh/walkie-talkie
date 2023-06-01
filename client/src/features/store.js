import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import senderDataSlice from "./slices/senderData";

const persistConfigSenderData = {
  key: "senderData",
  storage,
};

const persistedReducerSenderData = persistReducer(
  persistConfigSenderData,
  senderDataSlice
);

const store = configureStore({
  reducer: {
    senderData: persistedReducerSenderData,
  },
});

export const persistor = persistStore(store);
export default store;
