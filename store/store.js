import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "./authentication/authentication";
import feedbackSlice from "./feedback/feedback";
import teacherSlice from "./teacher/teacher";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    feedback: feedbackSlice.reducer,
    teacher: teacherSlice.reducer,
  },
});

export default store;
