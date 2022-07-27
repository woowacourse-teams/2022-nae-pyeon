import React from "react";
import styled from "@emotion/styled";

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

interface MyPageWrittenMessageListProp {
  messages: WrittenMessage[];
}

const MyPageWrittenMessageList = ({
  messages,
}: MyPageWrittenMessageListProp) => {
  return (
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
  );
};

const StyledMessageList = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  gap: 8px;
`;

export default MyPageWrittenMessageList;
