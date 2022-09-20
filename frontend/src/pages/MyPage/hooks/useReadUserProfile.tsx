import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMyInfo } from "@/api/member";

import { GetUserProfileResponse } from "@/types/apiResponse";
import { QueryOptions } from "@/types/api";

const useReadUserProfile = (options?: QueryOptions) => {
  return useQuery<GetUserProfileResponse, AxiosError>(
    ["user-profile"],
    () => getMyInfo(),
    {
      useErrorBoundary: !options?.onError,
      ...options,
    }
  );
};

export default useReadUserProfile;
