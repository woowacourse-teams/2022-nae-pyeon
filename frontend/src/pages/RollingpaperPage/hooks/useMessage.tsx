import React, { useState } from "react";

import { COLORS } from "@/constants";
import useCheckBox from "@/hooks/useCheckBox";

const INIT_COLOR = COLORS.YELLOW;

interface UseUpdateMessageProp {
  initContent?: string;
  initColor?: string;
  initAnonymous?: boolean;
  initSecret?: boolean;
}

const usePrevMessage = ({
  initContent = "",
  initColor = INIT_COLOR,
  initAnonymous = false,
  initSecret = false,
}: UseUpdateMessageProp) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(initContent);
  const [color, setColor] = useState(initColor);

  const { checked: anonymous, handleChange: handleAnonymousCheckBoxChange } =
    useCheckBox({ initialCheckedState: initAnonymous });
  const { checked: secret, handleChange: handleSecretCheckBoxChange } =
    useCheckBox({ initialCheckedState: initSecret });

  const handleWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEdit(true);
  };

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  const handleColorClick = (color: string) => {
    setColor(color);
  };

  const initMessage = () => {
    setIsEdit(false);
    setContent("");
    setColor(INIT_COLOR);
  };

  return {
    isEdit,
    color,
    content,
    anonymous,
    secret,
    handleWriteButtonClick,
    handleMessageChange,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    initMessage,
  };
};

export default usePrevMessage;
