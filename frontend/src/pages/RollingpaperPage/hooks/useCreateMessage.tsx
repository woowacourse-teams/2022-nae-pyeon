import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { postMessage } from "@/api/message";
import { Message, CustomError } from "@/types";

const useCreateMessage = (rollingpaperId: number) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: createMessage } = useMutation(
    ({
      content,
      color,
      anonymous,
      secret,
    }: Pick<Message, "content" | "color" | "anonymous" | "secret">) => {
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
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return {
    createMessage,
  };
};

export default useCreateMessage;
