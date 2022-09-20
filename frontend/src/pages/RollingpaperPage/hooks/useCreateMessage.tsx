import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { postMessage } from "@/api/message";

import { PostMessageResponse } from "@/types/apiResponse";
import { PostMessageRequest } from "@/types/apiRequest";

const useCreateMessage = (rollingpaperId: number) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: createMessage } = useMutation<
    PostMessageResponse,
    AxiosError,
    PostMessageRequest
  >(
    ({ content, color, anonymous, secret }) => {
      return postMessage({
        rollingpaperId,
        content,
        color,
        anonymous,
        secret,
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
        openSnackbar("메시지 작성 완료");
      },
      useErrorBoundary: true,
    }
  );

  return {
    createMessage,
  };
};

export default useCreateMessage;
