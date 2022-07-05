import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import IconButton from "@components/IconButton";
import RollingpaperMessage from "@components/RollingpaperMessage";

import { BiPencil } from "react-icons/bi";

interface Message {
  content: string;
  from: string;
  authorId: number;
}

interface LetterPaperProp {
  to: string;
  messageList: Message[];
}

const StyledLetterPaper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  background: #f7f7f7;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-items: center;

  height: calc(100% - 40px);
  overflow-y: scroll;

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LetterPaper = ({ to, messageList }: LetterPaperProp) => {
  const navigate = useNavigate();

  const handleMessageWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    navigate(`message/new`);
  };

  return (
    <StyledLetterPaper>
      <StyledLetterPaperTop>
        <StyledTo>To. {to}</StyledTo>
        <IconButton size="small" onClick={handleMessageWriteButtonClick}>
          <BiPencil />
        </IconButton>
      </StyledLetterPaperTop>
      <StyledMessageList>
        {messageList.map((message) => (
          <RollingpaperMessage
            content={message.content}
            author={message.from}
          />
        ))}
      </StyledMessageList>
    </StyledLetterPaper>
  );
};

export default LetterPaper;
