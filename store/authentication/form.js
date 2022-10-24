import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayForm: false,
  formMode: "login",
};

const authForm = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    toggleFormDisplay(state) {
      state.displayForm = !state.displayForm;
    },
    changeFormMode(state, action) {
      state.formMode = action.payload;
    },
  },
});

export const authFormActions = authForm.actions;
export default authForm;
