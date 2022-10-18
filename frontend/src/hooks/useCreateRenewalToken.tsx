import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { queryClient } from "@/api";
import { postRenewalToken } from "@/api/member";

import { COOKIE_KEY, TOKEN_MAX_AGE } from "@/constants";
import { PostRenewalTokenResponse } from "@/types/apiResponse";
import { setCookie } from "@/util/cookie";

const useCreateRenewalToken = () => {
  return useMutation<PostRenewalTokenResponse, AxiosError, string>(
    (refreshToken) => postRenewalToken(refreshToken),
    {
      onSuccess: (data) => {
        if (data) {
          const { accessToken } = data;
          setCookie({
            name: COOKIE_KEY.ACCESS_TOKEN,
            value: accessToken,
            maxAge: TOKEN_MAX_AGE.ACCESS_TOKEN,
          });
          queryClient.refetchQueries({ stale: true });
        }
      },
    }
  );
};

export default useCreateRenewalToken;