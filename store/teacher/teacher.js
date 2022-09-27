import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosenStudent: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    updateChosenStudent(state, action) {
      state.chosenStudent = action.payload;
    },
  },
});

export const teacherActions = teacherSlice.actions;
export default teacherSlice;
