import { AppDispatch, RootState } from "./index";
import { LoginUser } from "../utils/auth-provider";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panel";
import * as auth from "../utils/auth-provider";
import { bootstrapUser } from "context/auth-context";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const login = (form: LoginUser) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: LoginUser) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then((user) => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));

export const selectUser = (state: RootState) => state.auth.user;
