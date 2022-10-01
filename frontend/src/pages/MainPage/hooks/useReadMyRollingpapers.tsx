import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMyReceivedRollingpapers } from "@/api/member";

import { MYPAGE_ROLLINGPAPER_PAGING_COUNT } from "@/constants";

import { GetMyReceivedRollingpapersResponse } from "@/types/apiResponse";

const useReadReceivedRollingpapers = () => {
  return useQuery<GetMyReceivedRollingpapersResponse, AxiosError>(
    ["received-rollingpapers", 0],
    () =>
      getMyReceivedRollingpapers({
        page: 0,
        count: MYPAGE_ROLLINGPAPER_PAGING_COUNT,
      }),
    {
      useErrorBoundary: true,
    }
  );
};

export default useReadReceivedRollingpapers;
