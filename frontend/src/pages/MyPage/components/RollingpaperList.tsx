import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";

import { getMyReceivedRollingpapers } from "@/api/member";

import RollingpaperListItem from "@/pages/MyPage/components/RollingpaperListItem";
import Paging from "@/components/Paging";

import EmptyStateImg from "@/assets/images/empty-state.svg";
import { MYPAGE_ROLLINGPAPER_PAGING_COUNT } from "@/constants";

import { ResponseReceivedRollingpapers } from "@/types";
import usePaging from "@/hooks/usePaging";

interface RollingpaperListProp {
  maxPage: number;
}

const RollingpaperList = ({ maxPage }: RollingpaperListProp) => {
  const { currentPage, handleNumberClick, handleNextClick, handlePrevClick } =
    usePaging(maxPage);

  const { isLoading, isError, error, data } =
    useQuery<ResponseReceivedRollingpapers>(
      ["received-rollingpapers", currentPage],
      () =>
        getMyReceivedRollingpapers(
          currentPage,
          MYPAGE_ROLLINGPAPER_PAGING_COUNT
        ),
      { keepPreviousData: true }
    );

  if (isError || !data) {
    return <div>에러</div>;
  }

  if (data.rollingpapers.length === 0) {
    return <EmptyState />;
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
          currentPage={currentPage}
          maxPage={maxPage}
          handleNumberClick={handleNumberClick}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </StyledPaging>
    </>
  );
};

const EmptyState = () => {
  return (
    <StyledEmpty>
      <EmptyStateImg />
      <StyledEmptyMessage>아직 받은 롤링페이퍼가 없어요!</StyledEmptyMessage>
    </StyledEmpty>
  );
};

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 30px;

  svg {
    font-size: 150px;
  }
`;

const StyledEmptyMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin-bottom: 20px;
`;

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
