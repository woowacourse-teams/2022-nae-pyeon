import styled from "@emotion/styled";

import useValidatedParam from "@/hooks/useValidatedParam";

import IconButton from "@/components/IconButton";

import TrashIcon from "@/assets/icons/bx-trash.svg";
import Pencil from "@/assets/icons/bx-pencil.svg";
import LockIcon from "@/assets/icons/bx-lock-alt.svg";

import MessageUpdateForm from "@/pages/RollingpaperPage/components/MessageUpdateForm";
import useMessageBox from "@/pages/RollingpaperPage/hooks/useMessageBox";
import SecretMessage from "@/pages/RollingpaperPage/components/SecretMessage";
import Like from "@/pages/RollingpaperPage/components/Like";

import { Message, Recipient } from "@/types";

const MessageBox = ({
  id,
  content,
  from,
  color,
  anonymous,
  secret,
  editable,
  visible,
  likes,
  liked,
  recipientType,
}: Message & { recipientType: Recipient }) => {
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  const {
    isEdit,
    handleWriteButtonClick,
    handleDeleteButtonClick,
    handleEditEnd,
  } = useMessageBox({ id, rollingpaperId: rollingpaperId });

  if (!visible) {
    return <SecretMessage from={from} />;
  }

  if (isEdit) {
    return (
      <MessageUpdateForm
        id={id}
        content={content}
        color={color}
        anonymous={anonymous}
        secret={secret}
        onEditEnd={handleEditEnd}
        enableSecretMessage={recipientType === "MEMBER"}
      />
    );
  }

  return (
    <StyledMessage color={color}>
      <StyledMessageContent>{content}</StyledMessageContent>
      <StyledMessageBottomInfo>
        <StyledLike>
          <Like id={id} likes={likes} liked={liked} />
        </StyledLike>
        <StyledMessageBottom>
          {editable && (
            <StyledMessageButtonContainer>
              <IconButton size="small" onClick={handleWriteButtonClick}>
                <Pencil />
              </IconButton>
              <IconButton size="small" onClick={handleDeleteButtonClick}>
                <TrashIcon />
              </IconButton>
            </StyledMessageButtonContainer>
          )}
          <StyledMessageFrom>
            {secret && <LockIcon />}
            {!anonymous && from}
          </StyledMessageFrom>
        </StyledMessageBottom>
      </StyledMessageBottomInfo>
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
  white-space: break-spaces;
  word-break: break-all;

  font-size: 16px;
  line-height: 22px;
`;

const StyledMessageBottomInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMessageBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  height: 40px;

  padding-bottom: 4px;
`;

const StyledLike = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;

  margin-top: 16px;

  color: ${({ theme }) => theme.colors.GRAY_700};

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_700};
    font-size: 20px;
  }
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

const StyledMessageFrom = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  align-self: flex-end;
  margin-left: auto;

  max-width: 50%;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.GRAY_700};

  svg {
    top: 4px;
    font-size: 18px;
    fill: ${({ theme }) => theme.colors.GRAY_700};
  }
`;

export default MessageBox;
