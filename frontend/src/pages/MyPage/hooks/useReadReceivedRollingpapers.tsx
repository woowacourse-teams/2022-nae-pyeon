import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMyReceivedRollingpapers } from "@/api/member";

import { MYPAGE_ROLLINGPAPER_PAGING_COUNT } from "@/constants";

import { GetMyReceivedRollingpapersResponse } from "@/types/apiResponse";

const useReadReceivedRollingpapers = (currentPage = 0) => {
  return useQuery<GetMyReceivedRollingpapersResponse, AxiosError>(
    ["received-rollingpapers", currentPage],
    () =>
      getMyReceivedRollingpapers({
        page: currentPage,
        count: MYPAGE_ROLLINGPAPER_PAGING_COUNT,
      }),
    {
      keepPreviousData: true,
      useErrorBoundary: true,
    }
  );
};

export default useReadReceivedRollingpapers;
