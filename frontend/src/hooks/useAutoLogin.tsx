import React from "react";
import { useQuery } from "@tanstack/react-query";

import { setAppClientHeaderAuthorization } from "@/api";
import { getMyInfoWithAccessToken } from "@/api/member";

import { getCookie } from "@/util/cookie";
import { UserInfo } from "@/types/index";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

function useAutoLogin() {
  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  return useQuery<UserInfo>(
    ["memberId"],
    () => getMyInfoWithAccessToken(accessTokenCookie!),
    {
      enabled: !!accessTokenCookie,
      onSuccess: () => {
        setAppClientHeaderAuthorization(accessTokenCookie!);
      },
    }
  );
}

export default useAutoLogin;
