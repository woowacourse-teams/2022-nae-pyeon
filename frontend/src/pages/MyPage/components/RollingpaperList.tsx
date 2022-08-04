import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";

import { getMyReceivedRollingpapers } from "@/api/member";

import RollingpaperListItem from "@/pages/MyPage/components/RollingpaperListItem";
import Paging from "@/components/Paging";

import { MYPAGE_ROLLINGPAPER_PAGING_COUNT } from "@/constants";

import { ResponseReceivedRollingpapers } from "@/types";

const RollingpaperList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { isLoading, isError, error, data } =
    useQuery<ResponseReceivedRollingpapers>(
      ["received-rollingpapers", pageNumber],
      () =>
        getMyReceivedRollingpapers(
          pageNumber,
          MYPAGE_ROLLINGPAPER_PAGING_COUNT
        ),
      { keepPreviousData: true }
    );

  if (isError || !data) {
    return <div>에러</div>;
  }

  return (
    <>
      <StyledRollingpaperList>
        {data.rollingpapers.map((rollingpaper) => (
          <RollingpaperListItem {...rollingpaper} />
        ))}
      </StyledRollingpaperList>
      <StyledPaging>
        <Paging
          maxPage={Math.ceil(
            data.totalCount / MYPAGE_ROLLINGPAPER_PAGING_COUNT
          )}
          currentPage={pageNumber}
          setCurrentPage={setPageNumber}
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
