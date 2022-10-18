import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { postMessage } from "@/api/message";

import { PostMessageResponse } from "@/types/apiResponse";
import { PostMessageRequest } from "@/types/apiRequest";

const useCreateMessage = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<PostMessageResponse, AxiosError, PostMessageRequest>(
    ({ rollingpaperId, content, color, anonymous, secret }) => {
      return postMessage({
        rollingpaperId,
        content,
        color,
        anonymous,
        secret,
      });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
        openSnackbar("메시지 작성 완료");
      },
    }
  );
};

export default useCreateMessage;
