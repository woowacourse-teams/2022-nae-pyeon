import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import Paging from "@/components/Paging";
import MessageCard from "@/pages/MyPage/components/MessageCard";

interface WrittenMessage {
  id: number;
  rollingpaperId: number;
  rollingpaperTitle: string;
  teamId: number;
  teamName: string;
  to: string;
  content: string;
  color: string;
}

interface MessageListProp {
  messages: WrittenMessage[];
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
        {messages.map(
          ({ id, rollingpaperTitle, to, teamName, content, color }) => (
            <li key={id}>
              <MessageCard
                rollingpaperTitle={rollingpaperTitle}
                to={to}
                team={teamName}
                content={content}
                color={color}
              />
            </li>
          )
        )}
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

  margin-top: 16px;
  gap: 8px;
`;

const StyledPaging = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
`;

export default MessageList;
