import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postLogout } from "@/api/member";

import { PostLogoutRequest } from "@/types/apiRequest";

const useCreateLogout = () => {
  return useMutation<null, AxiosError, PostLogoutRequest>(
    ({ refreshToken }) => postLogout({ refreshToken }),
    {}
  );
};

export default useCreateLogout;
