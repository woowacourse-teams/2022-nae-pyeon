import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import Paging from "@/components/Paging";
import WrittenMessageCard from "@/components/WrittenMessageCard";

interface WrittenMessage {
  id: number;
  rollingpaperId: number;
  teamId: number;
  rollingpaperTitle: string;
  to: string;
  team: string;
  content: string;
  color: string;
}

interface MyPageWrittenMessageListPagingProp {
  messages: WrittenMessage[];
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MyPageWrittenMessageListPaging = ({
  messages,
  currentPage,
  maxPage,
  setCurrentPage,
}: MyPageWrittenMessageListPagingProp) => {
  return (
    <>
      <StyledMessageList>
        {messages.map(({ id, rollingpaperTitle, to, team, content, color }) => (
          <li key={id}>
            <WrittenMessageCard
              rollingpaperTitle={rollingpaperTitle}
              to={to}
              team={team}
              content={content}
              color={color}
            />
          </li>
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

  margin-top: 16px;
  gap: 8px;
`;

const StyledPaging = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
`;

export default MyPageWrittenMessageListPaging;
