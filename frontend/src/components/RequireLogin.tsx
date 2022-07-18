import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";

const RequireLogin = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireLogin;
