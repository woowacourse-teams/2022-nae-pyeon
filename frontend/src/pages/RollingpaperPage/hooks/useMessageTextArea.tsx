import React, { useEffect, useRef } from "react";

export const useMessageTextArea = (
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
) => {
  const textareaRef = useRef(null);
  const enterRef = useRef(0);

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.target.value.length > 500) {
      return;
    }
    if (onChange) {
      onChange(e);
    }
    const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextAreaKeyPress: React.KeyboardEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    if (e.key === "Enter") {
      if (enterRef.current >= 1) {
        e.preventDefault();
      }
      enterRef.current++;

      return;
    }

    enterRef.current = 0;
  };

  useEffect(() => {
    const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  return { textareaRef, handleTextAreaChange, handleTextAreaKeyPress };
};
