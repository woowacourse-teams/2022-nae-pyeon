import React, { useEffect, useRef } from "react";

const useMessageTextArea = (
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
) => {
  const textareaRef = useRef(null);

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

  useEffect(() => {
    const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  return { textareaRef, handleTextAreaChange };
};

export default useMessageTextArea;
