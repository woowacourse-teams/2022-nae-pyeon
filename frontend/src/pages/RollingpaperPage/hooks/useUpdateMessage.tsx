import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import useParamValidate from "@/hooks/useParamValidate";
import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putMessage, deleteMessage } from "@/api/message";
import { Message, CustomError } from "@/types";
import { COLORS } from "@/constants";

const INIT_COLOR = COLORS.YELLOW;

interface UseUpdateMessageProp {
  id: number;
  initContent: string;
  initColor: string;
  initAnonymous: boolean;
  initSecret: boolean;
}

const useUpdateMessage = ({
  id,
  initContent,
  initColor,
  initAnonymous,
  initSecret,
}: UseUpdateMessageProp) => {
  const [isWrite, setIsWrite] = useState(false);
  const [content, setContent] = useState(initContent);
  const [color, setColor] = useState(initColor);
  const [anonymous, setAnonymous] = useState(initAnonymous);
  const [secret, setSecret] = useState(initSecret);

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

  const { mutate: deleteRollingpaperMessage } = useMutation(
    () => deleteMessage({ rollingpaperId: +rollingpaperId, id }),
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

  const handleEditButtonClick = () => {
    setIsWrite(true);
  };

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  const handleMessageSubmit = () => {
    updateMessage({ content, color, anonymous, secret });
    setIsWrite(false);
  };

  const handleMessageCancel = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      setIsWrite(false);
    }
  };

  const handleDeleteButtonClick = () => {
    if (confirm("메시지를 삭제하시겠습니까?")) {
      deleteRollingpaperMessage();
    }
  };

  const handleColorClick = (color: string) => {
    setColor(color);
  };

  return {
    isWrite,
    color,
    content,
    handleEditButtonClick,
    handleMessageChange,
    handleMessageSubmit,
    handleMessageCancel,
    handleDeleteButtonClick,
    handleColorClick,
  };
};

export default useUpdateMessage;
