import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { deleteMessage } from "@/api/message";

import { Message } from "@/types";

const useDeleteMessage = (rollingpaperId: number) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: deleteRollingpaperMessage } = useMutation<
    null,
    AxiosError,
    Message["id"]
  >((id) => deleteMessage({ rollingpaperId, id }), {
    onSuccess: () => {
      queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      openSnackbar("메시지 삭제 완료");
    },
    useErrorBoundary: true,
  });

  return { deleteRollingpaperMessage };
};

export default useDeleteMessage;
