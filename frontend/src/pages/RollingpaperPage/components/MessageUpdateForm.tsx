import React from "react";

import useUpdateMessage from "@/pages/RollingpaperPage/hooks/useUpdateMessage";
import useMessageForm from "@/pages/RollingpaperPage/hooks/useMessageForm";

import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";

import { Message } from "@/types";

type MessageUpdateFormProps = {
  onEditEnd: () => void;
} & Pick<Message, "id" | "content" | "color" | "anonymous" | "secret">;

export const MessageUpdateForm = ({
  id,
  content,
  color,
  anonymous,
  secret,
  onEditEnd,
}: MessageUpdateFormProps) => {
  const {
    content: newContent,
    color: newColor,
    anonymous: newAnonymous,
    secret: newSecret,
    handleColorClick,
    handleMessageChange,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    initMessage,
  } = useMessageForm({
    initContent: content,
    initColor: color,
    initAnonymous: anonymous,
    initSecret: secret,
  });

  const { updateMessage } = useUpdateMessage(id);

  const handleMessageSubmit = () => {
    updateMessage({
      color: newColor,
      content: newContent,
      anonymous: newAnonymous,
      secret: newSecret,
    });
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
      content={newContent}
      color={newColor}
      anonymous={newAnonymous}
      secret={newSecret}
      handleColorClick={handleColorClick}
      handleMessageChange={handleMessageChange}
      handleAnonymousCheckBoxChange={handleAnonymousCheckBoxChange}
      handleSecretCheckBoxChange={handleSecretCheckBoxChange}
      handleMessageSubmit={handleMessageSubmit}
      handleMessageCancel={handleMessageCancel}
    />
  );
};

export default MessageUpdateForm;
