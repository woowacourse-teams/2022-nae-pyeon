import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import useParamValidate from "@/hooks/useParamValidate";
import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { postMessage } from "@/api/message";
import { Message, CustomError } from "@/types";
import { COLORS } from "@/constants";

const INIT_COLOR = COLORS.YELLOW;

const useCreateMessage = () => {
  const [writeNewMessage, setWriteNewMessage] = useState(false);
  const [content, setContent] = useState("");
  const [color, setColor] = useState(INIT_COLOR);
  const [anonymous, setAnonymous] = useState(false);
  const [secret, setSecret] = useState(false);

  const { openSnackbar } = useSnackbar();
  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);

  const { mutate: createMessage } = useMutation(
    ({
      content,
      color,
      anonymous,
      secret,
    }: Pick<Message, "content" | "color" | "anonymous" | "secret">) => {
      return postMessage({ rollingpaperId: +rollingpaperId, content, color });
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

  const handleMessageWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setWriteNewMessage(true);
  };

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  const handleMessageSubmit = () => {
    createMessage({ content, color, anonymous, secret });
    setContent("");
    setColor(INIT_COLOR);
    setWriteNewMessage(false);
  };

  const handleMessageCancel = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      setContent("");
      setColor(INIT_COLOR);
      setWriteNewMessage(false);
    }
  };

  const handleColorClick = (color: string) => {
    setColor(color);
  };

  return {
    writeNewMessage,
    handleMessageWriteButtonClick,
    handleMessageChange,
    handleMessageSubmit,
    handleMessageCancel,
    handleColorClick,
    content,
    color,
  };
};

export default useCreateMessage;
