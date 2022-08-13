import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import IconButton from "@components/IconButton";
import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";
import RollingpaperMessage from "@/pages/RollingpaperPage/components/RollingpaperMessage";

import { Message } from "@/types";

import PencilIcon from "@/assets/icons/bx-pencil.svg";
import { divideArrayByIndexRemainder } from "@/util";

import SecretMessage from "@/pages/RollingpaperPage/components/SecretMessage";
import useCreateMessage from "@/pages/RollingpaperPage/hooks/useCreateMessage";
import useNewMessage from "../hooks/useNewMessage";
import useParamValidate from "@/hooks/useParamValidate";

interface LetterPaperProp {
  to: string;
  messageList: Message[];
}

const LetterPaper = ({ to, messageList }: LetterPaperProp) => {
  const [slicedMessageLists, setSlicedMessageLists] = useState<Message[][]>(
    Array.from(Array(4), () => [])
  );
  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);

  const {
    writeNewMessage,
    content,
    color,
    anonymous,
    secret,
    handleMessageWriteButtonClick,
    handleMessageChange,
    handleColorClick,
    handleAnonymousCheckBoxChange,
    handleSecretCheckBoxChange,
    messageInit,
  } = useNewMessage();
  const { createMessage } = useCreateMessage(+rollingpaperId);

  const handleMessageSubmit = () => {
    createMessage({ content, color, anonymous, secret });
    messageInit();
  };

  const handleMessageCancel = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      messageInit();
    }
  };

  const updateSlicedMessageListByWindowWidth = () => {
    const width = window.innerWidth;

    let newSlicedMessageList;
    if (width < 960) {
      newSlicedMessageList = [messageList];
    } else if (width < 1280) {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 2);
    } else {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 3);
    }

    setSlicedMessageLists(newSlicedMessageList);
  };

  useEffect(() => {
    updateSlicedMessageListByWindowWidth();
  }, [messageList]);

  useEffect(() => {
    window.addEventListener("resize", updateSlicedMessageListByWindowWidth);
    return () =>
      window.removeEventListener(
        "resize",
        updateSlicedMessageListByWindowWidth
      );
  }, []);

  return (
    <StyledLetterPaper>
      <StyledLetterPaperTop>
        <StyledTo>To. {to}</StyledTo>
        {!writeNewMessage && (
          <IconButton size="small" onClick={handleMessageWriteButtonClick}>
            <PencilIcon />
          </IconButton>
        )}
      </StyledLetterPaperTop>
      <StyledSlicedMessageLists>
        {slicedMessageLists.map((messageList, index) => (
          <StyledMessageList key={index}>
            {index === 0 && writeNewMessage && (
              <MessageForm
                onSubmit={handleMessageSubmit}
                onCancel={handleMessageCancel}
                onChange={handleMessageChange}
                onClickColor={handleColorClick}
                onClickAnonymous={handleAnonymousCheckBoxChange}
                onClickSecret={handleSecretCheckBoxChange}
                content={content}
                color={color}
                anonymous={anonymous}
                secret={secret}
              />
            )}
            {messageList.map((message) => {
              if (message.visible) {
                return (
                  <RollingpaperMessage
                    key={message.id}
                    content={message.content}
                    author={message.from}
                    color={message.color}
                    messageId={message.id}
                    editable={message.editable}
                    anonymous={message.anonymous}
                    secret={message.secret}
                  />
                );
              }

              return <SecretMessage key={message.id} author={message.from} />;
            })}
          </StyledMessageList>
        ))}
      </StyledSlicedMessageLists>
    </StyledLetterPaper>
  );
};

const StyledLetterPaper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  background: ${({ theme }) => theme.colors.GRAY_100};
  border-radius: 8px;
`;

const StyledLetterPaperTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 20px;

  margin-bottom: 20px;
`;

const StyledTo = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

const StyledMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;

  a {
    display: inline-block;
  }
`;

const StyledSlicedMessageLists = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-items: center;

  height: calc(100% - 40px);

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default LetterPaper;
