import useCustomQuery from "@/api/useCustomQuery";
import { getMySentMessages } from "@/api/member";

import { MYPAGE_MESSAGE_PAGING_COUNT } from "@/constants";

import { GetMySentMessagesResponse } from "@/types/apiResponse";
import { QueryOptions } from "@/types/api";

// 공통된 로직은 api custom hook에서 처리하고
// error 처리나 이런것만 컴포넌트 단으로 넘길까??
export const useReadSentMessages = (
  currentPage = 0,
  options?: QueryOptions
) => {
  return useCustomQuery<GetMySentMessagesResponse>(
    ["sent-messages", currentPage],
    () =>
      getMySentMessages({
        page: currentPage,
        count: MYPAGE_MESSAGE_PAGING_COUNT,
      }),
    { ...options, keepPreviousData: true }
  );
};
