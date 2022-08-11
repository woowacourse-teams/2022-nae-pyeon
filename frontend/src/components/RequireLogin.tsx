import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "@/context/UserContext";

const RequireLogin = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RequireLogin;
