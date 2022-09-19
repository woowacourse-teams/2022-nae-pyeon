import { useQuery } from "@tanstack/react-query";
import { getMyReceivedRollingpapers } from "@/api/member";

import { MYPAGE_ROLLINGPAPER_PAGING_COUNT } from "@/constants";

import { GetMyReceivedRollingpapersResponse } from "@/types/apiResponse";

export const useReadReceivedRollingpapers = (currentPage = 0) => {
  return useQuery<GetMyReceivedRollingpapersResponse>(
    ["received-rollingpapers", currentPage],
    () =>
      getMyReceivedRollingpapers({
        page: currentPage,
        count: MYPAGE_ROLLINGPAPER_PAGING_COUNT,
      }),
    { keepPreviousData: true }
  );
};
