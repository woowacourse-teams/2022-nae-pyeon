import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postLogout } from "@/api/member";

type postLogoutTokenVariable = string;

const useCreateLogout = () => {
  return useMutation<null, AxiosError, postLogoutTokenVariable>(
    (refreshToken) => postLogout(refreshToken),
    {}
  );
};

export default useCreateLogout;
