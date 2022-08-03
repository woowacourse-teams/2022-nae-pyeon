import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import MessageListItem from "@/pages/MyPage/components/MessageListItem";
import Paging from "@/components/Paging";

import { SentMessage } from "@/types";

interface MessageListProp {
  messages: SentMessage[];
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MessageList = ({
  messages,
  currentPage,
  maxPage,
  setCurrentPage,
}: MessageListProp) => {
  return (
    <>
      <StyledMessageList>
        {messages.map((message) => (
          <MessageListItem {...message} />
        ))}
      </StyledMessageList>
      <StyledPaging>
        <Paging
          currentPage={currentPage}
          maxPage={maxPage}
          setCurrentPage={setCurrentPage}
        />
      </StyledPaging>
    </>
  );
};

const StyledMessageList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 400px;

  margin-top: 16px;
  gap: 8px;
`;

const StyledPaging = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
`;

export default MessageList;
