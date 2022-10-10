import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { deleteMessage } from "@/api/message";

import { Message } from "@/types";

interface useDeleteMessageProps {
  rollingpaperId: Message["id"];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
}

type DeleteRollingpaperMessageVariable = Message["id"];

const useDeleteMessage = ({
  rollingpaperId,
  setMessageList,
}: useDeleteMessageProps) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: deleteRollingpaperMessage } = useMutation<
    null,
    AxiosError,
    DeleteRollingpaperMessageVariable
  >((id) => deleteMessage({ rollingpaperId, id }), {
    onSuccess: (data, variable) => {
      setMessageList((prev) =>
        prev.filter((message) => message.id !== variable)
      );
      openSnackbar("메시지 삭제 완료");
    },
    useErrorBoundary: true,
  });

  return { deleteRollingpaperMessage };
};

export default useDeleteMessage;
