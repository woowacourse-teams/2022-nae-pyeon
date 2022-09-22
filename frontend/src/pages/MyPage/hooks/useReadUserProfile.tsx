import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMyInfo } from "@/api/member";

import { GetUserProfileResponse } from "@/types/apiResponse";

const useReadUserProfile = () => {
  return useQuery<GetUserProfileResponse, AxiosError>(
    ["user-profile"],
    () => getMyInfo(),
    {
      useErrorBoundary: true,
    }
  );
};

export default useReadUserProfile;
