import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { queryClient, setAppClientHeaderAuthorization } from "@/api";
import { postRenewalToken } from "@/api/member";

import { COOKIE_KEY, TOKEN_MAX_AGE } from "@/constants";
import { PostRenewalTokenResponse } from "@/types/apiResponse";
import { setCookie } from "@/util/cookie";

interface postRenewalTokenVariables {
  refreshToken: string;
  mutateFunc?: () => void;
}

const useCreateRenewalToken = () => {
  return useMutation<
    PostRenewalTokenResponse,
    AxiosError,
    postRenewalTokenVariables
  >(({ refreshToken, mutateFunc }) => postRenewalToken(refreshToken), {
    onSuccess: (data, variable) => {
      if (data) {
        const { accessToken } = data;
        setCookie({
          name: COOKIE_KEY.ACCESS_TOKEN,
          value: accessToken,
          maxAge: TOKEN_MAX_AGE.ACCESS_TOKEN,
        });
        setAppClientHeaderAuthorization(accessToken);

        if (variable.mutateFunc) {
          variable.mutateFunc();
        }

        queryClient.refetchQueries({ stale: true });
      }
    },
  });
};

export default useCreateRenewalToken;
