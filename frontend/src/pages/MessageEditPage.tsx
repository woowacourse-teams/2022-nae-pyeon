import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import Header from "@/components/Header";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import TextArea from "@/components/TextArea";

import { BiChevronLeft } from "react-icons/bi";

const MessageEditPage = () => {
  const { rollingpaperId, messageId } = useParams();
  const navigate = useNavigate();

  const [initialMessageContent, setInitialMessageContent] = useState(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const authorId = 123;

  const handleMessageFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contentRef.current) {
      console.error("ERROR :: No contentRef.current");
      return;
    }

    if (!contentRef.current.value) {
      alert("메시지를 작성해주세요");
      return;
    }

    axios
      .put(`/api/v1/rollingpapers/${rollingpaperId}/messages/${messageId}`, {
        content: contentRef.current.value,
      })
      .then((response) => {
        alert("메시지 수정 완료");
        navigate(`/rollingpaper/${rollingpaperId}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/rollingpapers/${rollingpaperId}/messages/${messageId}`)
      .then((response) => {
        setInitialMessageContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header>
        <IconButton onClick={handleBackButtonClick}>
          <BiChevronLeft />
        </IconButton>
      </Header>
      <StyledMain onSubmit={handleMessageFormSubmit}>
        {initialMessageContent && (
          <TextArea ref={contentRef} defaultValue={initialMessageContent} />
        )}
        <Button type="submit">완료</Button>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 48px 25px;

  button {
    align-self: flex-end;
  }
`;

export default MessageEditPage;
