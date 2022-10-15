import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { queryClient } from "@/api";
import { postRenewalToken } from "@/api/member";

import { COOKIE_KEY } from "@/constants";
import { PostRenewalTokenResponse } from "@/types/apiResponse";
import { setCookie } from "@/util/cookie";

type postRenewalTokenVariable = string;
const useCreateRenewalToken = () => {
  const { mutate: renewalToken } = useMutation<
    PostRenewalTokenResponse,
    AxiosError,
    postRenewalTokenVariable
  >((refreshToken) => postRenewalToken(refreshToken), {
    onSuccess: (data) => {
      if (data) {
        const { accessToken } = data;
        setCookie({
          name: COOKIE_KEY.ACCESS_TOKEN,
          value: accessToken,
          maxAge: 1800,
        });
        queryClient.refetchQueries({ stale: true });
      }
    },
  });

  return renewalToken;
};

export default useCreateRenewalToken;
