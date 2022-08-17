import React from "react";

import useParamValidate from "@/hooks/useParamValidate";
import useMessageForm from "@/pages/RollingpaperPage/hooks/useMessageForm";
import useCreateMessage from "@/pages/RollingpaperPage/hooks/useCreateMessage";

import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";

type MessageCreateFormProps = {
  onEditEnd: () => void;
};

export const MessageCreateForm = ({ onEditEnd }: MessageCreateFormProps) => {
  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);

  const {
    content,
    color,
    anonymous,
    secret,
    handleMessageChange,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    initMessage,
  } = useMessageForm({});

  const { createMessage } = useCreateMessage(+rollingpaperId);

  const handleMessageSubmit = () => {
    createMessage({ content, color, anonymous, secret });
    initMessage();
    onEditEnd();
  };

  const handleMessageCancel = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      initMessage();
      onEditEnd();
    }
  };

  return (
    <MessageForm
      content={content}
      color={content}
      anonymous={anonymous}
      secret={secret}
      handleColorClick={handleColorClick}
      handleMessageChange={handleMessageChange}
      handleAnonymousCheckBoxChange={handleAnonymousCheckBoxChange}
      handleSecretCheckBoxChange={handleSecretCheckBoxChange}
      handleMessageSubmit={handleMessageSubmit}
      handleMessageCancel={handleMessageCancel}
    />
  );
};

export default MessageCreateForm;
