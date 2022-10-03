import React, { useMemo } from "react";
import styled from "@emotion/styled";

import IconButton from "@components/IconButton";

import { Message, Recipient } from "@/types";

import PencilIcon from "@/assets/icons/bx-pencil.svg";

import MessageCreateForm from "@/pages/RollingpaperPage/components/MessageCreateForm";
import MessageBox from "@/pages/RollingpaperPage/components/MessageBox";
import useSliceMessageList from "@/pages/RollingpaperPage/hooks/useSliceMessageList";

import { ROLLINGPAPER_STATE_TYPE } from "@/constants";

interface LetterPaperProp {
  to: string;
  recipientType: Recipient;
  messageList: Message[];
  rollingpaperState: string;
  handleWriteButtonClick: () => void;
  handleEditButtonClick: () => void;
  handleWriteEnd: () => void;
}

const LetterPaper = ({
  to,
  recipientType,
  messageList,
  rollingpaperState,
  handleWriteButtonClick,
  handleEditButtonClick,
  handleWriteEnd,
}: LetterPaperProp) => {
  const elementList = useMemo(() => {
    const elementList = messageList
      .map((message) => (
        <MessageBox
          handleEditButtonClick={handleEditButtonClick}
          handleWriteEnd={handleWriteEnd}
          key={message.id}
          recipientType={recipientType}
          {...message}
        />
      ))
      .reverse();

    return rollingpaperState === ROLLINGPAPER_STATE_TYPE.WRITE
      ? [
          <MessageCreateForm
            enableSecretMessage={recipientType === "MEMBER"}
            onEditEnd={handleWriteEnd}
          />,
          ...elementList,
        ]
      : [...elementList];
  }, [rollingpaperState]);

  const slicedMessageLists = useSliceMessageList(elementList);

  return (
    <StyledLetterPaper>
      <StyledLetterPaperTop>
        <StyledTo>To. {to}</StyledTo>
        {rollingpaperState === ROLLINGPAPER_STATE_TYPE.NORMAL && (
          <IconButton size="small" onClick={handleWriteButtonClick}>
            <PencilIcon />
          </IconButton>
        )}
      </StyledLetterPaperTop>
      <StyledSlicedMessageLists>
        {slicedMessageLists.map((messageList, index) => (
          <StyledMessageList key={index}>{messageList}</StyledMessageList>
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
