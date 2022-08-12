import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import IconButton from "@components/IconButton";
import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";
import RollingpaperMessage from "@/pages/RollingpaperPage/components/RollingpaperMessage";

import { queryClient } from "@/api";
import { Message, CustomError } from "@/types";

import PencilIcon from "@/assets/icons/bx-pencil.svg";
import { divideArrayByIndexRemainder } from "@/util";
import { useSnackbar } from "@/context/SnackbarContext";
import { COLORS } from "@/constants";
import useParamValidate from "@/hooks/useParamValidate";
import { putMessage, postMessage } from "@/api/message";
import SecretMessage from "./SecretMessage";

const INIT_COLOR = COLORS.YELLOW;

interface LetterPaperProp {
  to: string;
  messageList: Message[];
}

interface EditMessageProp {
  messageId: number;
  color: string;
  content: string;
}

const LetterPaper = ({ to, messageList }: LetterPaperProp) => {
  const [writeNewMessage, setWriteNewMessage] = useState(false);
  const [editMessageId, setEditMessageId] = useState<number | null>(null);
  const [slicedMessageLists, setSlicedMessageLists] = useState<Message[][]>(
    Array.from(Array(4), () => [])
  );
  const [content, setContent] = useState("");
  const [color, setColor] = useState(INIT_COLOR);

  const { rollingpaperId } = useParamValidate(["rollingpaperId"]);
  const { openSnackbar } = useSnackbar();

  const { mutate: updateMessage } = useMutation(
    ({ content, color }: Pick<Message, "content" | "color">) => {
      return putMessage({
        rollingpaperId: +rollingpaperId,
        id: editMessageId,
        content,
        color,
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
        openSnackbar("메시지 수정 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const { mutate: createMessage } = useMutation(
    ({ content, color }: Pick<Message, "content" | "color">) => {
      return postMessage({ rollingpaperId: +rollingpaperId, content, color });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
        openSnackbar("메시지 작성 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleMessageWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setWriteNewMessage(true);
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

  const handleEditMessageClick = ({
    messageId,
    color,
    content,
  }: EditMessageProp) => {
    setEditMessageId(messageId);
    setColor(color);
    setContent(content);
  };

  const submitMessageForm = () => {
    if (!writeNewMessage && editMessageId) {
      updateMessage({ content, color });
    }
    if (writeNewMessage) {
      createMessage({ content, color });
    }

    setContent("");
    setColor(INIT_COLOR);
    setWriteNewMessage(false);
    setEditMessageId(null);
  };

  const cancelMessageWrite = () => {
    if (confirm("메시지 작성을 취소하시겠습니까?")) {
      setContent("");
      setColor(INIT_COLOR);
      setWriteNewMessage(false);
      setEditMessageId(null);
    }
  };

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
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
        {!writeNewMessage && !editMessageId && (
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
                onSubmit={submitMessageForm}
                onCancel={cancelMessageWrite}
                content={content}
                onChange={handleMessageChange}
                color={color}
                onClickColor={setColor}
              />
            )}
            {messageList.map((message) => {
              if (!writeNewMessage && editMessageId === message.id) {
                return (
                  <MessageForm
                    key={message.id}
                    onSubmit={submitMessageForm}
                    onCancel={cancelMessageWrite}
                    content={content}
                    onChange={handleMessageChange}
                    color={color}
                    onClickColor={setColor}
                  />
                );
              }

              if (message.visible) {
                return (
                  <RollingpaperMessage
                    key={message.id}
                    content={message.content}
                    author={message.from}
                    color={message.color}
                    messageId={message.id}
                    onClickEdit={handleEditMessageClick}
                    editable={message.editable}
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
