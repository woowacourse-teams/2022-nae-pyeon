import React, { useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import TextArea from "@/components/TextArea";

import { BiChevronLeft } from "react-icons/bi";

const MessageWritePage = () => {
  const { rollingpaperId } = useParams();
  const navigate = useNavigate();

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const authorId = 123;

  const handleMessageFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(contentRef.current?.value);

    if (!contentRef.current) {
      console.error("ERROR :: No contentRef.current");
      return;
    }

    if (!contentRef.current.value) {
      alert("메시지를 작성해주세요");
      return;
    }

    axios
      .post(`/api/v1/rollingpapers/${rollingpaperId}/messages`, {
        content: contentRef.current.value,
        authorId: authorId,
      })
      .then((response) => {
        navigate(`/rollingpaper/${rollingpaperId}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <>
      <Header>
        <IconButton onClick={handleBackButtonClick}>
          <BiChevronLeft />
        </IconButton>
      </Header>
      <StyledMain onSubmit={handleMessageFormSubmit}>
        <TextArea ref={contentRef} />
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

export default MessageWritePage;
