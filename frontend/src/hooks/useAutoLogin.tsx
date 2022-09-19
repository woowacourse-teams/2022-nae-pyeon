import useCustomQuery from "@/api/useCustomQuery";

import { setAppClientHeaderAuthorization } from "@/api";
import { getMyInfoWithAccessToken } from "@/api/member";

import { getCookie } from "@/util/cookie";
import { QueryOptions } from "@/types/api";
import { GetUserProfileResponse } from "@/types/apiResponse";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

// 이 훅은 이름을 Read를 넣는게 맞을까....?
function useAutoLogin(options?: QueryOptions) {
  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  return useCustomQuery<GetUserProfileResponse>(
    ["memberId"],
    () => getMyInfoWithAccessToken(accessTokenCookie!),
    {
      // query option을 custom hook에서 제공하고 있음. 이거는 이때 하는게 맞는 것 같음
      // 모든 auto login에 대해 똑같은 처리가 필요함
      ...options,
      enabled: !!accessTokenCookie,
      onSuccess: () => {
        setAppClientHeaderAuthorization(accessTokenCookie!);
      },
    }
  );
}

export default useAutoLogin;
