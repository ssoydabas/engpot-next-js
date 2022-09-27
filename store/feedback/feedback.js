import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null };

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    cleanMessage(state) {
      state.message = null;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice;
