import { useEffect, useContext } from "react";

import { UserContext } from "@/context/UserContext";
import ErrorPage from "../ErrorPage";

const LogoutPage = () => {
  const { logout } = useContext(UserContext);

  useEffect(() => {
    logout();
  }, []);

  return <ErrorPage />;
};

export default LogoutPage;
