import styled from "@emotion/styled";

import useValidateParam from "@/hooks/useValidateParam";

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
  const rollingpaperId = useValidateParam<number>("rollingpaperId");

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

      <StyledMessageBottom>
        <StyledMessageLikeContainer>
          <Like id={id} likes={likes} liked={liked} />
        </StyledMessageLikeContainer>

        <StyledBottomRightContainer>
          <StyledMessageFrom>
            {secret && <LockIcon />}
            {!anonymous && from}
          </StyledMessageFrom>

          <StyledMessageButtonContainer>
            {editable && (
              <>
                <IconButton
                  size="small"
                  onClick={handleWriteButtonClick}
                  ariaLabel="메시지 수정"
                >
                  <Pencil />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDeleteButtonClick}
                  ariaLabel="메시지 삭제"
                >
                  <TrashIcon />
                </IconButton>
              </>
            )}
          </StyledMessageButtonContainer>
        </StyledBottomRightContainer>
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
  white-space: break-spaces;
  word-break: break-all;

  font-size: 16px;
  line-height: 22px;
`;

const StyledMessageBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding-bottom: 4px;
  margin-top: 24px;
`;

const StyledBottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledMessageLikeContainer = styled.div`
  position: relative;
  top: -16px;
  left: -6px;

  display: flex;
  gap: 8px;

  button {
    padding: 6px;
  }

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_600};
  }
`;

const StyledMessageButtonContainer = styled.div`
  position: relative;
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
  padding: 6px;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.GRAY_700};

  svg {
    top: 4px;
    font-size: 18px;
    fill: ${({ theme }) => theme.colors.GRAY_700};
  }
`;

export default MessageBox;
