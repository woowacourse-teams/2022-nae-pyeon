import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import ReceivedRollingpaperCard from "@/components/ReceivedRollingpaperCard";
import Paging from "@/components/Paging";

interface MyPageRollingpaper {
  id: number;
  title: string;
  teamId: number;
  teamName: string;
}

interface MyPageRollingpaperListPaging {
  rollingpapers: MyPageRollingpaper[];
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MyPageRollingpaperListPaging = ({
  rollingpapers,
  currentPage,
  maxPage,
  setCurrentPage,
}: MyPageRollingpaperListPaging) => {
  return (
    <>
      <StyledRollingpaperList>
        {rollingpapers.map(({ title, teamName, id }) => (
          <li key={id}>
            <ReceivedRollingpaperCard title={title} teamName={teamName} />
          </li>
        ))}
      </StyledRollingpaperList>
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

const StyledRollingpaperList = styled.ul`
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

export default MyPageRollingpaperListPaging;
