import { useMutation } from "@tanstack/react-query";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { deleteMessage } from "@/api/message";
import { AxiosError } from "axios";
import { DeleteMessageRequest } from "@/types/apiRequest";

const useDeleteMessage = (id: number, rollingpaperId: number) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: deleteRollingpaperMessage } = useMutation<
    null,
    AxiosError,
    DeleteMessageRequest
  >(() => deleteMessage({ rollingpaperId, id }), {
    onSuccess: () => {
      queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      openSnackbar("메시지 삭제 완료");
    },
    useErrorBoundary: true,
  });

  return { deleteRollingpaperMessage };
};

export default useDeleteMessage;
