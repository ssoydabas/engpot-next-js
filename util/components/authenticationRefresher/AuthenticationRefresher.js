import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication.js";

function AuthenticationRefresher({ children }) {
  const dispatch = useDispatch();

  const safeGuard = () => {
    if (typeof window !== "undefined") {
      dispatch(authenticationActions.refreshAuthenticationToken());
    }
  };
  useEffect(() => {
    safeGuard();
  });

  return <div>{children}</div>;
}

export default AuthenticationRefresher;
