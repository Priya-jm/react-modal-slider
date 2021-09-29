import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './reducers/loaderSlice'
import userStatusReducer from "./reducers/useStatusSlice"

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    userStatus: userStatusReducer
  },
})

export type rootState = ReturnType<typeof store.getState>;

export default store;