import useCustomQuery from "@/api/useCustomQuery";
import { getMyInfo } from "@/api/member";

import { GetUserProfileResponse } from "@/types/apiResponse";
import { QueryOptions } from "@/types/api";

export const useReadUserProfile = (options?: QueryOptions) => {
  return useCustomQuery<GetUserProfileResponse>(
    ["user-profile"],
    () => getMyInfo(),
    { ...options }
  );
};
