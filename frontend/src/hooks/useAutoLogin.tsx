import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { setAppClientHeaderAuthorization } from "@/api";
import { getMyInfoWithAccessToken } from "@/api/member";

import { getCookie } from "@/util/cookie";
import { COOKIE_KEY } from "@/constants";

import { GetUserProfileResponse } from "@/types/apiResponse";

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
    }
  );
}

export default useAutoLogin;
