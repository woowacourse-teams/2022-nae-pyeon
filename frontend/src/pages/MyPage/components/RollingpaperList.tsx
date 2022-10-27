import styled from "@emotion/styled";

import usePaging from "@/hooks/usePaging";
import useReadReceivedRollingpapers from "@/hooks/api/member/useReadReceivedRollingpapers";

import RollingpaperListItem from "@/components/RollinpaperListItem";
import Paging from "@/components/Paging";
import EmptyRollingpaperList from "@/components/EmptyRollingpaperList";
import Loading from "@/components/Loading";

interface RollingpaperListProps {
  lastPage: number;
}

const RollingpaperList = ({ lastPage }: RollingpaperListProps) => {
  const { currentPage, handleNumberClick, handleNextClick, handlePrevClick } =
    usePaging(lastPage);

  const { isLoading, data } = useReadReceivedRollingpapers(currentPage);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (data.rollingpapers.length === 0) {
    return <EmptyRollingpaperList />;
  }

  return (
    <StyledListWithPaging>
      <StyledRollingpaperList>
        {data.rollingpapers.map((rollingpaper) => (
          <RollingpaperListItem key={rollingpaper.id} {...rollingpaper} />
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

const StyledListWithPaging = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 580px;
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
