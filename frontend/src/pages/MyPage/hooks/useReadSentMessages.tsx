import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMySentMessages } from "@/api/member";

import { MYPAGE_MESSAGE_PAGING_COUNT } from "@/constants";

import { GetMySentMessagesResponse } from "@/types/apiResponse";

const useReadSentMessages = (currentPage = 0) =>
  useQuery<GetMySentMessagesResponse, AxiosError>(
    ["sent-messages", currentPage],
    () =>
      getMySentMessages({
        page: currentPage,
        count: MYPAGE_MESSAGE_PAGING_COUNT,
      }),
    { keepPreviousData: true }
  );

export default useReadSentMessages;
