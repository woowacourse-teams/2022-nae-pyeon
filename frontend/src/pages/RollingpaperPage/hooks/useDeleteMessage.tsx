import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { deleteMessage } from "@/api/message";

import { CustomError } from "@/types";

interface UseDeleteMessageProp {
  rollingpaperId: number;
}

const useDeleteMessage = (rollingpaperId: number) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: deleteRollingpaperMessage } = useMutation(
    (id: number) => deleteMessage({ rollingpaperId, id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
        openSnackbar("메시지 삭제 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return { deleteRollingpaperMessage };
};

export default useDeleteMessage;
