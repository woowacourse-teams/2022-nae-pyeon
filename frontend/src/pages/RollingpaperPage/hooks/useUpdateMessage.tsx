import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import useParamValidate from "@/hooks/useParamValidate";
import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putMessage } from "@/api/message";
import { Message, CustomError } from "@/types";

const useUpdateMessage = (id: number) => {
  const { openSnackbar } = useSnackbar();
  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);

  const { mutate: updateMessage } = useMutation(
    ({
      content,
      color,
      anonymous,
      secret,
    }: Pick<Message, "content" | "color" | "anonymous" | "secret">) => {
      return putMessage({
        rollingpaperId: +rollingpaperId,
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
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return {
    updateMessage,
  };
};

export default useUpdateMessage;
