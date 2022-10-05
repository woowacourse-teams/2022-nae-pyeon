import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "@/context/UserContext";
import { getCookie } from "@/util/cookie";
import { COOKIE_KEY } from "@/constants";

const RequireLogin = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  if (!getCookie(COOKIE_KEY.ACCESS_TOKEN)) {
    logout();
  }

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
