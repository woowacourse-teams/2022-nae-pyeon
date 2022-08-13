import React from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import TrashIcon from "@/assets/icons/bx-trash.svg";
import Pencil from "@/assets/icons/bx-pencil.svg";

import useParamValidate from "@/hooks/useParamValidate";
import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";
import usePrevMessage from "@/pages/RollingpaperPage/hooks/usePrevMessage";
import useDeleteMessage from "@/pages/RollingpaperPage/hooks/useDeleteMessage";
import useUpdateMessage from "@/pages/RollingpaperPage/hooks/useUpdateMessage";

interface RollingpaperMessageProp {
  content: string;
  author: string;
  color: string;
  messageId: number;
  editable: boolean;
  anonymous: boolean;
  secret: boolean;
}

const RollingpaperMessage = ({
  content,
  author,
  color,
  messageId,
  editable,
  anonymous,
  secret,
}: RollingpaperMessageProp) => {
  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);
  const {
    isWrite,
    color: newColor,
    content: newContent,
    anonymous: newAnonymous,
    secret: newSecret,
    handleMessageChange,
    handleEditButtonClick,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    messageInit,
  } = usePrevMessage({
    initContent: content,
    initColor: color,
    initAnonymous: anonymous,
    initSecret: secret,
  });

  const { updateMessage } = useUpdateMessage(messageId);
  const { deleteRollingpaperMessage } = useDeleteMessage(+rollingpaperId);

  const handleMessageSubmit = () => {
    updateMessage({
      color: newColor,
      content: newContent,
      anonymous: newAnonymous,
      secret: newSecret,
    });
    messageInit();
  };

  const handleDeleteButtonClick = () => {
    deleteRollingpaperMessage(messageId);
  };

  const handleMessageCancel = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      messageInit();
    }
  };

  if (isWrite) {
    return (
      <MessageForm
        onSubmit={handleMessageSubmit}
        onCancel={handleMessageCancel}
        onChange={handleMessageChange}
        content={newContent}
        color={newColor}
        onClickColor={handleColorClick}
        onClickAnonymous={handleAnonymousCheckBoxChange}
        onClickSecret={handleSecretCheckBoxChange}
        anonymous={newAnonymous}
        secret={newSecret}
      />
    );
  }

  return (
    <StyledMessage color={color}>
      <StyledMessageContent>{content}</StyledMessageContent>
      <StyledMessageBottom>
        {editable && (
          <StyledMessageButtonContainer>
            <IconButton size="small" onClick={handleEditButtonClick}>
              <Pencil />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteButtonClick}>
              <TrashIcon />
            </IconButton>
          </StyledMessageButtonContainer>
        )}
        <StyledMessageAuthor>{author}</StyledMessageAuthor>
      </StyledMessageBottom>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  aspect-ratio: 1;
  min-width: 180px;
  padding: 20px 20px 12px;

  background-color: ${(props) => props.color};
`;

const StyledMessageContent = styled.div`
  overflow: hidden;

  font-size: 16px;
  line-height: 22px;
`;

const StyledMessageBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 12px;
  padding: 4px 0 4px 0;
`;

const StyledMessageButtonContainer = styled.div`
  position: relative;
  left: -6px;
  top: 6px;

  display: flex;
  gap: 8px;

  button {
    padding: 6px;
  }

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_600};
  }
`;

const StyledMessageAuthor = styled.div`
  width: 50%;
  text-align: right;
  margin-left: auto;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

export default RollingpaperMessage;
