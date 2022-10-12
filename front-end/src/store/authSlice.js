import messageSlice from "./messageSlice";
import { messageActions } from "./messageSlice";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "./services/auth.service";
import { getNotes } from "./services/note-services";

const user = JSON.parse(localStorage.getItem("user"));
const notes = ["xxx2"];
const note = "";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, confirmPassword, role }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        username,
        password,
        confirmPassword,
        role
      );
      thunkAPI.dispatch(messageActions.setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(messageActions.setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(messageActions.setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user, notes }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
