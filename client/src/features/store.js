import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistTest = {
//   key: "test",
//   storage,
// };

const store = configureStore({
  reducer: {},
});

// export const persistor = persistStore(store);
export default store;
