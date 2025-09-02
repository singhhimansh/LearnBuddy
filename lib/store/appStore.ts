import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import apiSlice from "./slices/apiSlice";

const appStore = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default appStore;

// export type StoreState = ReturnType<typeof appStore.getState>;
// export type AppDispatch = typeof appStore.dispatch;