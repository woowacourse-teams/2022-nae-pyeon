import useCustomQuery from "@/api/useCustomQuery";
import { getMyReceivedRollingpapers } from "@/api/member";

import { MYPAGE_ROLLINGPAPER_PAGING_COUNT } from "@/constants";

import { GetMyReceivedRollingpapersResponse } from "@/types/apiResponse";
import { QueryOptions } from "@/types/api";

export const useReadReceivedRollingpapers = (
  currentPage = 0,
  options?: QueryOptions
) => {
  return useCustomQuery<GetMyReceivedRollingpapersResponse>(
    ["received-rollingpapers", currentPage],
    () =>
      getMyReceivedRollingpapers({
        page: currentPage,
        count: MYPAGE_ROLLINGPAPER_PAGING_COUNT,
      }),
    { ...options, keepPreviousData: true }
  );
};
