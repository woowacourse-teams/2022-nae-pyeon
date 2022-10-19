import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { appClient, queryClient, requestApi } from "@/api";

import { Method } from "@/types";

interface RetryFuncParams {
  requestMethod: Method;
  requestUrl: string;
  requestData?: string;
}

const retryFunc = async ({
  requestMethod,
  requestUrl,
  requestData,
}: RetryFuncParams) =>
  requestApi(() =>
    appClient[requestMethod](requestUrl, requestData && JSON.parse(requestData))
  );

const useRetryMutate = () =>
  useMutation<null, AxiosError, RetryFuncParams>(
    ({ requestMethod, requestUrl, requestData }) =>
      retryFunc({ requestMethod, requestUrl, requestData }),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    }
  );

export default useRetryMutate;
