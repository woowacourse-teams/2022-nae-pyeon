import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import appClient from "@/api";

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import RequireLogin from "@/components/RequireLogin";

import { Message } from "@/types";

const MessageWritePage = () => {
  const { rollingpaperId } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createMessage } = useMutation(
    ({ content }: Pick<Message, "content">) => {
      return appClient
        .post(`/rollingpapers/${rollingpaperId}/messages`, {
          content,
        })
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

  return (
    <RequireLogin>
      <>
        <PageTitleWithBackButton />
        <StyledForm onSubmit={handleMessageFormSubmit}>
          <TextArea ref={contentRef} />
          <Button type="submit">완료</Button>
        </StyledForm>
      </>
    </RequireLogin>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  button {
    align-self: flex-end;
  }
`;

export default MessageWritePage;
