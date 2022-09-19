import { useQuery } from "@tanstack/react-query";
import { getMySentMessages } from "@/api/member";

import { MYPAGE_MESSAGE_PAGING_COUNT } from "@/constants";

import { GetMySentMessagesResponse } from "@/types/apiResponse";

export const useReadSentMessages = (currentPage = 0) => {
  return useQuery<GetMySentMessagesResponse>(
    ["sent-messages", currentPage],
    () =>
      getMySentMessages({
        page: currentPage,
        count: MYPAGE_MESSAGE_PAGING_COUNT,
      }),
    { keepPreviousData: true }
  );
};
