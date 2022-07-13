import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { BiChevronLeft } from "react-icons/bi";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import RollingpaperMessageDetail from "@/components/RollingpaperMessageDetail";

import { Message } from "@/types";

const MessageDetailPage = () => {
  const { rollingpaperId, messageId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingGetMessage,
    isError: isErrorGetMessage,
    data: message,
  } = useQuery<Message>(["message"], () =>
    axios
      .get(`/api/v1/rollingpapers/${rollingpaperId}/messages/${messageId}`)
      .then((response) => response.data)
  );

  const { mutate: deleteMessage } = useMutation(
    () => {
      return axios
        .delete(`/api/v1/rollingpapers/${rollingpaperId}/messages/${messageId}`)
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        alert("메시지 삭제 완료");
        navigate(`/rollingpaper/${rollingpaperId}`, { replace: true });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/rollingpaper/${rollingpaperId}/message/${messageId}/edit`);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteMessage();
  };

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  if (isLoadingGetMessage) {
    return <div>로딩중</div>;
  }

  if (isErrorGetMessage || !message) {
    return <div>에러</div>;
  }

  return (
    <>
      <Header>
        <IconButton onClick={handleBackButtonClick}>
          <BiChevronLeft />
        </IconButton>
      </Header>
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

  padding: 48px 25px;

  button {
    align-self: flex-end;
  }
`;

export default MessageDetailPage;
