import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";

const RequireLogout = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireLogout;
