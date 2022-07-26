import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";

import IconButton from "@components/IconButton";
import RollingpaperMessage from "@components/RollingpaperMessage";
import { Message } from "@/types";

import PencilIcon from "@/assets/icons/bx-pencil.svg";
import { divideArrayByIndexRemainder } from "@/util";

interface LetterPaperProp {
  to: string;
  messageList: Message[];
}

const LetterPaper = ({ to, messageList }: LetterPaperProp) => {
  const navigate = useNavigate();
  const [slicedMessageLists, setSlicedMessageLists] = useState<Message[][]>([
    [],
    [],
    [],
    [],
  ]);

  const handleMessageWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    navigate(`message/new`);
  };

  const updateSlicedMessageListByWindowWidth = () => {
    const width = window.innerWidth;

    let newSlicedMessageList;
    if (width < 960) {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 2);
    } else if (width < 1280) {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 3);
    } else {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 4);
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
        <IconButton size="small" onClick={handleMessageWriteButtonClick}>
          <PencilIcon />
        </IconButton>
      </StyledLetterPaperTop>
      <StyledSlicedMessageLists>
        {slicedMessageLists.map((messageList, index) => (
          <StyledMessageList key={index}>
            {messageList.map((message) => (
              <Link key={message.id} to={`message/${message.id}`}>
                <RollingpaperMessage
                  content={message.content}
                  author={message.from}
                />
              </Link>
            ))}
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
  font-weight: 600;
`;

const StyledMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  a {
    display: inline-block;
  }
`;

const StyledSlicedMessageLists = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-items: center;

  height: calc(100% - 40px);

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default LetterPaper;
