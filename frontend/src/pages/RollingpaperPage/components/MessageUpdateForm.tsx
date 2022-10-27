import useValidateParam from "@/hooks/useValidateParam";

import { useUpdateMessage } from "@/hooks/api/message";
import useMessageForm from "@/pages/RollingpaperPage/hooks/useMessageForm";
import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";

import { Message, Rollingpaper } from "@/types";

interface MessageUpdateFormProps
  extends Pick<Message, "id" | "content" | "color" | "anonymous" | "secret"> {
  enableSecretMessage: boolean;
  onEditEnd: () => void;
}

export const MessageUpdateForm = ({
  enableSecretMessage,
  id,
  content,
  color,
  anonymous,
  secret,
  onEditEnd,
}: MessageUpdateFormProps) => {
  const rollingpaperId = useValidateParam<Rollingpaper["id"]>("rollingpaperId");
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
  const { mutate: updateMessage } = useUpdateMessage();

  const handleMessageSubmit = () => {
    updateMessage({
      rollingpaperId,
      id,
      color: newColor,
      content: newContent,
      anonymous: newAnonymous,
      secret: enableSecretMessage && newSecret,
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
