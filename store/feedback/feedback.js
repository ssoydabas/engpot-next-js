import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null };

const feedback = createSlice({
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

export const feedbackActions = feedback.actions;
export default feedback;
