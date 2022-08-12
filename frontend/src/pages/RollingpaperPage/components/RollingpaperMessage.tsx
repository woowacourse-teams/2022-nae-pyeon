import React, { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";
import axios from "axios";

import IconButton from "@/components/IconButton";

import { UserContext } from "@/context/UserContext";

import TrashIcon from "@/assets/icons/bx-trash.svg";
import Pencil from "@/assets/icons/bx-pencil.svg";

import { CustomError } from "@/types";
import { queryClient } from "@/api";
import { useSnackbar } from "@/context/SnackbarContext";
import { deleteMessage } from "@/api/message";
import useParamValidate from "@/hooks/useParamValidate";

interface EditMessageProp {
  messageId: number;
  color: string;
  content: string;
}

interface RollingpaperMessageProp {
  content: string;
  author: string;
  color: string;
  authorId: number;
  messageId: number;
  onClickEdit: ({ messageId, color, content }: EditMessageProp) => void;
}

const RollingpaperMessage = ({
  content,
  author,
  color,
  authorId,
  messageId,
  onClickEdit,
}: RollingpaperMessageProp) => {
  const { memberId } = useContext(UserContext);
  const { openSnackbar } = useSnackbar();
  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);

  const { mutate: deleteRollingpaperMessage } = useMutation(
    () => deleteMessage({ rollingpaperId: +rollingpaperId, id: messageId }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
        openSnackbar("메시지 삭제 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleEditButtonClick = () => {
    onClickEdit({ messageId, color, content });
  };

  const handleDeleteButtonClick = () => {
    if (confirm("메시지를 삭제하시겠습니까?")) {
      deleteRollingpaperMessage();
    }
  };

  return (
    <StyledMessage color={color}>
      <StyledMessageContent>{content}</StyledMessageContent>
      <StyledMessageBottom>
        {memberId === authorId && (
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
  white-space: pre-line;

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
