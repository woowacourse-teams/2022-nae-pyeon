import React from "react";
import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";

import IconButton from "@components/IconButton";
import RollingpaperMessage from "@components/RollingpaperMessage";
import { Message } from "@/types";

import PencilIcon from "@/assets/icons/bx-pencil.svg";

interface LetterPaperProp {
  to: string;
  messageList: Message[];
}

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
          <PencilIcon />
        </IconButton>
      </StyledLetterPaperTop>
      <StyledMessageList>
        {messageList.map((message) => (
          <Link key={message.id} to={`message/${message.id}`}>
            <RollingpaperMessage
              content={message.content}
              author={message.from}
            />
          </Link>
        ))}
      </StyledMessageList>
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
