import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { BiChevronLeft } from "react-icons/bi";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import RollingpaperMessageDetail from "@/components/RollingpaperMessageDetail";

import { Message } from "@/types";

const MessageDetailPage = () => {
  const { rollingpaperId, messageId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState<Message | null>(null);

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/rollingpaper/${rollingpaperId}/message/${messageId}/edit`);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios
      .delete(`/api/v1/rollingpapers/${rollingpaperId}/messages/${messageId}`)
      .then((response) => {
        alert("메시지 삭제 완료");
        navigate(`/rollingpaper/${rollingpaperId}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/v1/rollingpapers/${rollingpaperId}/messages/${messageId}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!message) {
    return (
      <>
        <Header>
          <IconButton>
            <BiChevronLeft />
          </IconButton>
        </Header>
        <StyledMain>
          <RollingpaperMessageDetail
            content={""}
            author={""}
            handleDeleteButtonClick={handleDeleteButtonClick}
            handleEditButtonClick={handleEditButtonClick}
          />
        </StyledMain>
      </>
    );
  }

  return (
    <>
      <Header>
        <IconButton>
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
