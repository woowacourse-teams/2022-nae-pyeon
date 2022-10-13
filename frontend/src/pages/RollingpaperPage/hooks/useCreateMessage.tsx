import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { postMessage } from "@/api/message";

import { PostMessageResponse } from "@/types/apiResponse";
import { Message } from "@/types";

interface createMessageVariable
  extends Pick<Message, "content" | "color" | "anonymous" | "secret"> {}

const useCreateMessage = (rollingpaperId: number) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: createMessage } = useMutation<
    PostMessageResponse,
    AxiosError,
    createMessageVariable
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
    }
  );

  return {
    createMessage,
  };
};

export default useCreateMessage;
