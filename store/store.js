import { configureStore } from "@reduxjs/toolkit";

import authentication from "./authentication/authentication";
import authForm from "./authentication/form";
import feedback from "./feedback/Feedback";

const store = configureStore({
  reducer: {
    authentication: authentication.reducer,
    authForm: authForm.reducer,
    feedback: feedback.reducer,
  },
});

export default store;
