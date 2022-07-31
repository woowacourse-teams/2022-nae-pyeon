import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import Paging from "@/components/Paging";
import WrittenMessageCard from "@/pages/MyPage/components/WrittenMessageCard";

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

interface MyPagePaginatedMessageListProp {
  messages: WrittenMessage[];
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MyPagePaginatedMessageList = ({
  messages,
  currentPage,
  maxPage,
  setCurrentPage,
}: MyPagePaginatedMessageListProp) => {
  return (
    <>
      <StyledMessageList>
        {messages.map(
          ({ id, rollingpaperTitle, to, teamName, content, color }) => (
            <li key={id}>
              <WrittenMessageCard
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

export default MyPagePaginatedMessageList;
