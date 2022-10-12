import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notesSlice";
import { authSlice } from "./authSlice";
import messageSlice from "./messageSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    auth: authSlice.reducer,
    message: messageSlice.reducer,
  },
  devTools: true,
});

export default store;
