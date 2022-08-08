import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "@/context/UserContext";
import { appClient } from "@/api";
import { getCookie } from "@/util/cookie";

interface UserInfo {
  id: number;
  username: string;
  email: string;
}

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

const RequireLogin = () => {
  const { isLoggedIn, login } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  const { isSuccess, error } = useQuery<UserInfo>(
    ["memberId"],
    () =>
      appClient
        .get("/members/me", {
          headers: {
            Authorization: `Bearer ${accessTokenCookie || ""}`,
          },
        })
        .then((response) => response.data),
    {
      enabled: !!accessTokenCookie,
      onSuccess: (data) => {
        login(accessTokenCookie!, data.id);

        appClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessTokenCookie}`;
      },
    }
  );

  if (isSuccess) {
    return <Outlet />;
  }
  return <>{error}</>;
};

export default RequireLogin;
