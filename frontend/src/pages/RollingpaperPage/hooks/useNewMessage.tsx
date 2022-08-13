import React, { useState } from "react";

import useCheckBox from "@/hooks/useCheckBox";

import { COLORS } from "@/constants";

const INIT_COLOR = COLORS.YELLOW;

const useNewMessage = () => {
  const [writeNewMessage, setWriteNewMessage] = useState(false);
  const [content, setContent] = useState("");
  const [color, setColor] = useState(INIT_COLOR);

  const { checked: anonymous, handleChange: handleAnonymousCheckBoxChange } =
    useCheckBox({ initialCheckedState: false });
  const { checked: secret, handleChange: handleSecretCheckBoxChange } =
    useCheckBox({ initialCheckedState: false });

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

  const messageInit = () => {
    setContent("");
    setColor(INIT_COLOR);
    setWriteNewMessage(false);
  };

  const handleColorClick = (color: string) => {
    setColor(color);
  };

  return {
    writeNewMessage,
    content,
    color,
    anonymous,
    secret,
    handleMessageWriteButtonClick,
    handleMessageChange,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    messageInit,
  };
};

export default useNewMessage;
