import { configureStore } from "@reduxjs/toolkit";

import authentication from "./authentication/authentication.js";
import authForm from "./authentication/form.js";
import feedback from "./feedback/feedback.js";

const store = configureStore({
  reducer: {
    authentication: authentication.reducer,
    authForm: authForm.reducer,
    feedback: feedback.reducer,
  },
});

export default store;
