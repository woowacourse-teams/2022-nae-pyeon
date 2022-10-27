import useMessageForm from "@/pages/RollingpaperPage/hooks/useMessageForm";
import { useCreateMessage } from "@/hooks/api/message";

import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";

import useValidateParam from "@/hooks/useValidateParam";

interface MessageCreateFormProps {
  enableSecretMessage: boolean;
  onEditEnd: () => void;
}

export const MessageCreateForm = ({
  enableSecretMessage,
  onEditEnd,
}: MessageCreateFormProps) => {
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

  const rollingpaperId = useValidateParam<number>("rollingpaperId");
  const { mutate: createMessage } = useCreateMessage();

  const handleMessageSubmit = () => {
    createMessage({
      rollingpaperId,
      content,
      color,
      anonymous,
      secret: enableSecretMessage && secret,
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
      content={content}
      color={color}
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
