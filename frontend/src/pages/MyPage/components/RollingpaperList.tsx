import styled from "@emotion/styled";

import RollingpaperListItem from "@/pages/MyPage/components/RollingpaperListItem";
import Paging from "@/components/Paging";

import usePaging from "@/hooks/usePaging";

import useReadReceivedRollingpapers from "@/pages/MyPage/hooks/useReadReceivedRollingpapers";

import EmptyStateImg from "@/assets/images/empty-state.svg";

interface RollingpaperListProp {
  lastPage: number;
}

const RollingpaperList = ({ lastPage }: RollingpaperListProp) => {
  const { currentPage, handleNumberClick, handleNextClick, handlePrevClick } =
    usePaging(lastPage);

  const { isLoading, data } = useReadReceivedRollingpapers(currentPage);

  if (!data) {
    return <div>에러</div>;
  }

  if (data.rollingpapers.length === 0) {
    return <EmptyState />;
  }

  return (
    <StyledListWithPaging>
      <StyledRollingpaperList>
        {data.rollingpapers.map((rollingpaper) => (
          <RollingpaperListItem {...rollingpaper} />
        ))}
      </StyledRollingpaperList>
      <StyledPaging>
        <Paging
          currentPage={currentPage}
          lastPage={lastPage}
          handleNumberClick={handleNumberClick}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </StyledPaging>
    </StyledListWithPaging>
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

const StyledListWithPaging = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 580px;
`;

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
