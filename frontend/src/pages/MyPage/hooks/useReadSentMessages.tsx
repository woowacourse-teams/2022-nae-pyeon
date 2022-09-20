import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMySentMessages } from "@/api/member";

import { MYPAGE_MESSAGE_PAGING_COUNT } from "@/constants";

import { GetMySentMessagesResponse } from "@/types/apiResponse";
import { QueryOptions } from "@/types/api";

const useReadSentMessages = (currentPage = 0, options?: QueryOptions) =>
  useQuery<GetMySentMessagesResponse, AxiosError>(
    ["sent-messages", currentPage],
    () =>
      getMySentMessages({
        page: currentPage,
        count: MYPAGE_MESSAGE_PAGING_COUNT,
      }),
    { keepPreviousData: true, useErrorBoundary: !options?.onError, ...options }
  );

export default useReadSentMessages;
