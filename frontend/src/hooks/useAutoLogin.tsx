import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { setAppClientHeaderAuthorization } from "@/api";
import { getMyInfoWithAccessToken } from "@/api/member";

import { getCookie } from "@/util/cookie";

import { QueryOptions } from "@/types/api";
import { GetUserProfileResponse } from "@/types/apiResponse";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

function useAutoLogin(options?: QueryOptions) {
  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  return useQuery<GetUserProfileResponse, AxiosError>(
    ["memberId"],
    () => getMyInfoWithAccessToken(accessTokenCookie!),
    {
      enabled: !!accessTokenCookie,
      onSuccess: () => {
        setAppClientHeaderAuthorization(accessTokenCookie!);
      },
      useErrorBoundary: !options?.onError,
      ...options,
    }
  );
}

export default useAutoLogin;
