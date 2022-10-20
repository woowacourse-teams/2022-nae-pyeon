import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { deleteMessage } from "@/api/message";

import { DeleteMessageRequest } from "@/types/apiRequest";

const useDeleteMessage = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, DeleteMessageRequest>(
    ({ rollingpaperId, id }) => deleteMessage({ rollingpaperId, id }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
        openSnackbar("메시지 삭제 완료");
      },
    }
  );
};

export default useDeleteMessage;
