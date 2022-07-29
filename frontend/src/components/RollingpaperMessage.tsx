import React, { useContext } from "react";
import { useMutation } from "react-query";
import styled from "@emotion/styled";
import axios from "axios";

import IconButton from "@/components/IconButton";

import { UserContext } from "@/context/UserContext";

import TrashIcon from "@/assets/icons/bx-trash.svg";
import Pencil from "@/assets/icons/bx-pencil.svg";

import { CustomError } from "@/types";
import appClient from "@/api";
import { useSnackbar } from "@/context/SnackbarContext";
interface RollingpaperMessageProp {
  content: string;
  author: string;
  color: string;
  authorId: number;
  messageId: number;
  rollingpaperId: number;
}

const RollingpaperMessage = ({
  content,
  author,
  color,
  authorId,
  messageId,
  rollingpaperId,
}: RollingpaperMessageProp) => {
  const { memberId } = useContext(UserContext);
  const { openSnackbar } = useSnackbar();

  const { mutate: deleteMessage } = useMutation(
    () => {
      return appClient
        .delete(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
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
    console.log("edit");
  };

  const handleDeleteButtonClick = () => {
    deleteMessage();
  };

  return (
    <StyledMessage color={color}>
      <StyledMessageContent>{content}</StyledMessageContent>
      <StyledMessageBottom>
        {memberId === authorId && (
          <StyledMessageButton>
            <IconButton size="small" onClick={handleEditButtonClick}>
              <Pencil />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteButtonClick}>
              <TrashIcon />
            </IconButton>
          </StyledMessageButton>
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

  width: 130px;
  min-height: 130px;
  padding: 20px 15px 10px;

  background-color: ${(props) => props.color};

  @media only screen and (min-width: 600px) {
    width: 180px;
    min-height: 180px;
  }
`;

const StyledMessageContent = styled.div`
  overflow: hidden;

  font-size: 14px;
  line-height: 16px;

  @media only screen and (min-width: 600px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const StyledMessageBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 12px;
  padding: 4px 0 4px 0;
`;

const StyledMessageButton = styled.div`
  display: flex;
  gap: 4px;

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_700};
  }
`;

const StyledMessageAuthor = styled.div`
  margin-left: auto;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

export default RollingpaperMessage;
