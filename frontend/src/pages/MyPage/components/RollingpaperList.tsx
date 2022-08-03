import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import RollingpaperListItem from "@/pages/MyPage/components/RollingpaperListItem";
import Paging from "@/components/Paging";

import { ReceivedRollingpaper } from "@/types";

interface RollingpaperList {
  rollingpapers: ReceivedRollingpaper[];
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const RollingpaperList = ({
  rollingpapers,
  currentPage,
  maxPage,
  setCurrentPage,
}: RollingpaperList) => {
  return (
    <>
      <StyledRollingpaperList>
        {rollingpapers.map((rollingpaper) => (
          <RollingpaperListItem {...rollingpaper} />
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

export default RollingpaperList;
