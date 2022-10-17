import React from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useValidatedParam from "@/hooks/useValidatedParam";
import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putMessage } from "@/api/message";

import { Message } from "@/types";

interface UpdateMessageVariables
  extends Pick<Message, "content" | "color" | "anonymous" | "secret"> {}

const useUpdateMessage = (id: Message["id"]) => {
  const { openSnackbar } = useSnackbar();
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  const { mutate: updateMessage } = useMutation<
    null,
    AxiosError,
    UpdateMessageVariables
  >(
    ({ content, color, anonymous, secret }) => {
      return putMessage({
        rollingpaperId: rollingpaperId,
        id,
        content,
        color,
        anonymous,
        secret,
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
        openSnackbar("메시지 수정 완료");
      },
    }
  );

  return {
    updateMessage,
  };
};

export default useUpdateMessage;
