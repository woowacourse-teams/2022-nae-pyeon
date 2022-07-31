import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import appClient from "@/api";
import RollingpaperMessageDetail from "@/components/RollingpaperMessageDetail";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

import { CustomError, Message } from "@/types";

const MessageDetailPage = () => {
  const { teamId, rollingpaperId, messageId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingGetMessage,
    isError: isErrorGetMessage,
    error: getMessageError,
    data: message,
  } = useQuery<Message>(["message"], () =>
    appClient
      .get(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
      .then((response) => response.data)
  );

  const { mutate: deleteMessage } = useMutation(
    () => {
      return appClient
        .delete(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        alert("메시지 삭제 완료");
        navigate(`/team/${teamId}/rollingpaper/${rollingpaperId}`, {
          replace: true,
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("edit");
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteMessage();
  };

  if (isLoadingGetMessage) {
    return <div>로딩중</div>;
  }

  if (isErrorGetMessage) {
    if (axios.isAxiosError(getMessageError) && getMessageError.response) {
      const customError = getMessageError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!message) {
    return <div>에러</div>;
  }

  return (
    <>
      <PageTitleWithBackButton />
      <StyledMain>
        <RollingpaperMessageDetail
          content={message.content}
          author={message.from}
          handleDeleteButtonClick={handleDeleteButtonClick}
          handleEditButtonClick={handleEditButtonClick}
        />
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  button {
    align-self: flex-end;
  }
`;

export default MessageDetailPage;
