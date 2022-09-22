import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { setAppClientHeaderAuthorization } from "@/api";
import { getMyInfoWithAccessToken } from "@/api/member";

import { getCookie } from "@/util/cookie";

import { GetUserProfileResponse } from "@/types/apiResponse";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

function useAutoLogin() {
  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  return useQuery<GetUserProfileResponse, AxiosError>(
    ["memberId"],
    () => getMyInfoWithAccessToken(accessTokenCookie!),
    {
      enabled: !!accessTokenCookie,
      onSuccess: () => {
        setAppClientHeaderAuthorization(accessTokenCookie!);
      },
      useErrorBoundary: true,
    }
  );
}

export default useAutoLogin;
