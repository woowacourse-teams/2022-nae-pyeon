import React, { useState } from "react";

import useCheckBox from "@/hooks/useCheckBox";

interface UseUpdateMessageProp {
  initContent: string;
  initColor: string;
  initAnonymous: boolean;
  initSecret: boolean;
}

const usePrevMessage = ({
  initContent,
  initColor,
  initAnonymous,
  initSecret,
}: UseUpdateMessageProp) => {
  const [isWrite, setIsWrite] = useState(false);
  const [content, setContent] = useState(initContent);
  const [color, setColor] = useState(initColor);

  const { checked: anonymous, handleChange: handleAnonymousCheckBoxChange } =
    useCheckBox({ initialCheckedState: initAnonymous });
  const { checked: secret, handleChange: handleSecretCheckBoxChange } =
    useCheckBox({ initialCheckedState: initSecret });

  const handleEditButtonClick = () => {
    setIsWrite(true);
  };

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  const handleColorClick = (color: string) => {
    setColor(color);
  };

  const messageInit = () => {
    setIsWrite(false);
  };

  return {
    isWrite,
    color,
    content,
    anonymous,
    secret,
    handleMessageChange,
    handleEditButtonClick,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    messageInit,
  };
};

export default usePrevMessage;
