import React from "react";
import styled from "@emotion/styled";

import ReceivedRollingpaperCard from "@/components/ReceivedRollingpaperCard";
import { Rollingpaper } from "@/types";

interface MyPageRollingpaper {
  id: number;
  title: string;
  teamId: number;
  teamName: string;
}

interface MyPageRollingpaperList {
  rollingpapers: MyPageRollingpaper[];
}

const MyPageRollingpaperList = ({ rollingpapers }: MyPageRollingpaperList) => {
  return (
    <StyledRollingpaperList>
      {rollingpapers.map(({ title, teamName, id }) => (
        <li key={id}>
          <ReceivedRollingpaperCard title={title} teamName={teamName} />
        </li>
      ))}
    </StyledRollingpaperList>
  );
};

const StyledRollingpaperList = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  gap: 8px;
`;

export default MyPageRollingpaperList;
