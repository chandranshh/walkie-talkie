import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import senderDataSlice from "./slices/senderDataSlice";
import getTokenSlice from "./slices/getTokenSlice";
import setReceiverData from "./slices/setReceiverData";

const persistConfigSenderData = {
  key: "senderData",
  storage,
};

const persistConfigToken = {
  key: "token",
  storage,
};

const persistedReducerSenderData = persistReducer(
  persistConfigSenderData,
  senderDataSlice
);

const persistedReducerGetToken = persistReducer(
  persistConfigToken,
  getTokenSlice
);

const store = configureStore({
  reducer: {
    senderData: persistedReducerSenderData,
    tokenData: persistedReducerGetToken,
    receiverData: setReceiverData,
  },
});

export const persistor = persistStore(store);
export default store;
