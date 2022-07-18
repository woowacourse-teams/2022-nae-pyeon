import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery, useMutation } from "react-query";

import appClient from "@/api";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import RequireLogin from "@/components/RequireLogin";

import { Message } from "@/types";

const MessageEditPage = () => {
  const { rollingpaperId, messageId } = useParams();
  const navigate = useNavigate();

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const {
    isLoading: isLoadingGetMessage,
    isError: isErrorGetMessage,
    data: initialMessage,
  } = useQuery<Message>(["message"], () =>
    appClient
      .get(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
      .then((response) => response.data)
  );

  const { mutate: updateMessage } = useMutation(
    ({ content }: Pick<Message, "content">) => {
      return appClient
        .put(`/rollingpapers/${rollingpaperId}/messages/${messageId}`, {
          content,
        })
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        alert("메시지 수정 완료");
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

    updateMessage({ content: contentRef.current.value });
  };

  if (isLoadingGetMessage) {
    return <div>로딩중</div>;
  }

  if (isErrorGetMessage || !initialMessage) {
    return <div>에러</div>;
  }

  return (
    <RequireLogin>
      <>
        <PageTitleWithBackButton />
        <StyledForm onSubmit={handleMessageFormSubmit}>
          {initialMessage && (
            <TextArea ref={contentRef} defaultValue={initialMessage.content} />
          )}
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

export default MessageEditPage;
