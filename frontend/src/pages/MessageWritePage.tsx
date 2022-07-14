import React, { useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import Header from "@/components/Header";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import TextArea from "@/components/TextArea";

import { BiChevronLeft } from "react-icons/bi";
import { Message } from "@/types";

const MessageWritePage = () => {
  const { rollingpaperId } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const accessToken = "accessToken";

  const { mutate: createMessage } = useMutation(
    ({ content }: Pick<Message, "content">) => {
      return axios
        .post(
          `/api/v1/rollingpapers/${rollingpaperId}/messages`,
          {
            content,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        navigate(`/rollingpaper/${rollingpaperId}`, { replace: true });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

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

    createMessage({ content: contentRef.current.value });
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

  padding: 48px 40px;

  button {
    align-self: flex-end;
  }
`;

export default MessageWritePage;
