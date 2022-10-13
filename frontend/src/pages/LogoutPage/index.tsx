import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";
import ErrorPage from "../ErrorPage";

const LogoutPage = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/", { replace: true });
  }, []);

  return <ErrorPage />;
};

export default LogoutPage;
