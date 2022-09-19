import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@/api/member";

import { GetUserProfileResponse } from "@/types/apiResponse";

export const useReadUserProfile = () => {
  return useQuery<GetUserProfileResponse>(
    ["user-profile"],
    () => getMyInfo(),
    {}
  );
};
