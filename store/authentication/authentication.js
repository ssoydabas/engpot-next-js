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
      let currentTime = new Date().getTime();
      let expirationTime = currentTime + 36000000;
      localStorage.setItem(
        "authenticationToken",
        action.payload.authenticationToken
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authenticationTimer", expirationTime);

      state.authenticationTimer = expirationTime;
      state.authenticationToken = action.payload.authenticationToken;
      state.user = action.payload.user;
    },
    refreshAuthenticationToken(state) {
      if (typeof window !== "undefined") {
        const authenticationTimer = localStorage.getItem("authenticationTimer");
        const authenticationToken = localStorage.getItem("authenticationToken");
        const user = localStorage.getItem("user");
        
        if (user && authenticationToken) {
          let currentTime = new Date().getTime();

          if (authenticationTimer - currentTime > 0) {
            localStorage.setItem("authenticationToken", authenticationToken);
            localStorage.setItem("user", user);

            state.authenticationToken = authenticationToken;
            state.user = JSON.parse(user);
          } else {
            localStorage.removeItem("authenticationToken");
            localStorage.removeItem("authenticationTimer");
            localStorage.removeItem("user");
          }
        }
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
