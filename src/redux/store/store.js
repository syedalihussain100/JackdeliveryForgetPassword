import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/user/userSlice";

const store = configureStore({
  reducer: {
       users:userReducer
  },
});

export default store;
