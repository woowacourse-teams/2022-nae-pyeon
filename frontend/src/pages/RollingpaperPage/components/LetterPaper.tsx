import React, { useMemo } from "react";
import styled from "@emotion/styled";

import IconButton from "@components/IconButton";

import { Message, RollingpaperRecipient } from "@/types";

import PencilIcon from "@/assets/icons/bx-pencil.svg";

import MessageCreateForm from "@/pages/RollingpaperPage/components/MessageCreateForm";
import MessageBox from "@/pages/RollingpaperPage/components/MessageBox";
import useMessageWrite from "@/pages/RollingpaperPage/hooks/useMessageWrite";
import useSliceMessageList from "../hooks/useSliceMessageList";

interface LetterPaperProp {
  to: string;
  recipientType: RollingpaperRecipient;
  messageList: Message[];
}

const LetterPaper = ({ to, recipientType, messageList }: LetterPaperProp) => {
  const { isWrite, handleWriteButtonClick, handleWriteEnd } = useMessageWrite();

  const messageForm = (
    <MessageCreateForm
      enableSecretMessage={recipientType === "MEMBER"}
      onEditEnd={handleWriteEnd}
    />
  );

  const elementList = useMemo(() => {
    const elementList = messageList
      .map((message) => (
        <MessageBox
          key={message.id}
          recipientType={recipientType}
          {...message}
        />
      ))
      .reverse();

    return isWrite ? [messageForm, ...elementList] : [...elementList];
  }, [messageList, isWrite]);

  const slicedMessageLists = useSliceMessageList(elementList);

  return (
    <StyledLetterPaper>
      <StyledLetterPaperTop>
        <StyledTo>To. {to}</StyledTo>
        {!isWrite && (
          <IconButton size="small" onClick={handleWriteButtonClick}>
            <PencilIcon />
          </IconButton>
        )}
      </StyledLetterPaperTop>
      <StyledSlicedMessageLists>
        {slicedMessageLists.map((messageList, index) => (
          <StyledMessageList key={index}>
            <>{...messageList}</>
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
