import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postLogout } from "@/api/member";

type postLogoutTokenVariable = string;

const useCreateLogout = () => {
  const { mutate: logoutRefreshToken } = useMutation<
    null,
    AxiosError,
    postLogoutTokenVariable
  >((refreshToken) => postLogout(refreshToken), {});

  return logoutRefreshToken;
};

export default useCreateLogout;
