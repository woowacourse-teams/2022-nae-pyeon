import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { deleteMessage } from "@/api/message";

import { Rollingpaper, Message } from "@/types";

type DeleteMessageVariables = Message["id"];

const useDeleteMessage = (rollingpaperId: Rollingpaper["id"]) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: deleteRollingpaperMessage } = useMutation<
    null,
    AxiosError,
    DeleteMessageVariables
  >((id) => deleteMessage({ rollingpaperId, id }), {
    onSuccess: () => {
      queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      openSnackbar("메시지 삭제 완료");
    },
  });

  return { deleteRollingpaperMessage };
};

export default useDeleteMessage;
