import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticationToken: null,
  user: null,
  authenticationTimer: null,

  displayForm: false,
  formMode: "login",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthenticationToken(state, action) {
      localStorage.setItem(
        "authenticationToken",
        action.payload.authenticationToken
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      state.authenticationToken = action.payload.authenticationToken;
      state.user = action.payload.user;
    },
    refreshAuthenticationToken(state) {
      const authenticationToken = localStorage.getItem("authenticationToken");
      const user = localStorage.getItem("user");

      if (user && authenticationToken) {
        localStorage.setItem("authenticationToken", authenticationToken);
        localStorage.setItem("user", user);

        state.authenticationToken = authenticationToken;
        state.user = JSON.parse(user);
      }
    },
    terminateAuthenticationToken(state) {
      state.authenticationToken = null;
      state.user = null;
      localStorage.removeItem("authenticationToken");
      localStorage.removeItem("authenticationTimer");
      localStorage.removeItem("user");
    },
    refreshUserObject(state, action) {
      state.authenticationToken = state.authenticationToken;
      state.user = action.payload.user;
    },

    toggleFormDisplay(state) {
      state.displayForm = !state.displayForm;
    },
    changeFormMode(state, action) {
      state.formMode = action.payload;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice;
