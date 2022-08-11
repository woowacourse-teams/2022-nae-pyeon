import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "@/context/UserContext";

const RequireLogout = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RequireLogout;
