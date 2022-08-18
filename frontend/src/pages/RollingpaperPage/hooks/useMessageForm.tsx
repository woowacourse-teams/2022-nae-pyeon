import React, { useState } from "react";

import { COLORS } from "@/constants";
import useCheckBox from "@/hooks/useCheckBox";

const INIT_COLOR = COLORS.YELLOW;

interface UseMessageFormArgs {
  initContent?: string;
  initColor?: string;
  initAnonymous?: boolean;
  initSecret?: boolean;
}

const useMessageForm = ({
  initContent = "",
  initColor = INIT_COLOR,
  initAnonymous = false,
  initSecret = false,
}: UseMessageFormArgs) => {
  const [content, setContent] = useState(initContent);
  const [color, setColor] = useState(initColor);

  const { checked: anonymous, handleChange: handleAnonymousCheckBoxChange } =
    useCheckBox({ initialCheckedState: initAnonymous });
  const { checked: secret, handleChange: handleSecretCheckBoxChange } =
    useCheckBox({ initialCheckedState: initSecret });

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  const handleColorClick = (color: string) => {
    setColor(color);
  };

  const initMessage = () => {
    setContent("");
    setColor(INIT_COLOR);
  };

  return {
    color,
    content,
    anonymous,
    secret,
    handleMessageChange,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    initMessage,
  };
};

export default useMessageForm;
