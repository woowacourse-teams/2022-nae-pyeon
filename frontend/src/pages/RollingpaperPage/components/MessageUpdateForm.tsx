import React from "react";

import useUpdateMessage from "@/pages/RollingpaperPage/hooks/useUpdateMessage";
import useMessageForm from "@/pages/RollingpaperPage/hooks/useMessageForm";

import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";

import { Message } from "@/types";

interface MessageUpdateFormProps
  extends Pick<Message, "id" | "content" | "color" | "anonymous" | "secret"> {
  enableSecretMessage: boolean;
  onEditEnd: () => void;
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const MessageUpdateForm = ({
  enableSecretMessage,
  id,
  content,
  color,
  anonymous,
  secret,
  onEditEnd,
  setMessageList,
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
  } = useMessageForm({
    initContent: content,
    initColor: color,
    initAnonymous: anonymous,
    initSecret: secret,
  });

  const { updateMessage } = useUpdateMessage({ id, setMessageList });

  const handleMessageSubmit = () => {
    updateMessage({
      color: newColor,
      content: newContent,
      anonymous: newAnonymous,
      secret: enableSecretMessage && newSecret,
    });
    onEditEnd();
  };

  const handleMessageCancel = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      onEditEnd();
    }
  };

  return (
    <MessageForm
      enableSecretMessage={enableSecretMessage}
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
