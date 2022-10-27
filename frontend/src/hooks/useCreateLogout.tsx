import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postLogout } from "@/api/member";

import { postLogoutRequest } from "@/types/apiRequest";

const useCreateLogout = () => {
  return useMutation<null, AxiosError, postLogoutRequest>(
    ({ refreshToken }) => postLogout({ refreshToken }),
    {}
  );
};

export default useCreateLogout;
