import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putMessage } from "@/api/message";

import { PutMessageRequest } from "@/types/apiRequest";

const useUpdateMessage = () => {
  const { openSnackbar } = useSnackbar();

  const { mutate: updateMessage } = useMutation<
    null,
    AxiosError,
    PutMessageRequest
  >(
    ({ rollingpaperId, id, content, color, anonymous, secret }) => {
      return putMessage({
        rollingpaperId,
        id,
        content,
        color,
        anonymous,
        secret,
      });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
        openSnackbar("메시지 수정 완료");
      },
    }
  );

  return {
    updateMessage,
  };
};

export default useUpdateMessage;
