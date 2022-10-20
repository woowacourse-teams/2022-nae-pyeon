import styled from "@emotion/styled";

import useReadReceivedRollingpapers from "@/pages/MyPage/hooks/useReadReceivedRollingpapers";

import EmptyRollingpaperList from "@/components/EmptyRollingpaperList";
import RollingpaperListItem from "@/components/RollinpaperListItem";
import Loading from "@/components/Loading";

import SectionHeader from "@/pages/MainPage/components/SectionHeader";

const ReceivedRollingpapersSection = () => {
  const { data: receivedRollingpapers, isLoading: isLoadingRollingpapers } =
    useReadReceivedRollingpapers();

  if (isLoadingRollingpapers || !receivedRollingpapers) {
    return <Loading />;
  }

  return (
    <section>
      <SectionHeader
        title="나의 롤링페이퍼"
        count={receivedRollingpapers?.totalCount}
        moreLink="/mypage"
      />
      <StyledRollingpaperList>
        {receivedRollingpapers?.rollingpapers.length === 0 ? (
          <EmptyRollingpaperList />
        ) : (
          receivedRollingpapers?.rollingpapers.map(
            ({ title, teamId, id, teamName }) => (
              <RollingpaperListItem
                key={id}
                title={title}
                teamId={teamId}
                id={id}
                teamName={teamName}
              />
            )
          )
        )}
      </StyledRollingpaperList>
    </section>
  );
};

const StyledRollingpaperList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 10px;
  margin-bottom: 20px;

  height: 460px;
`;

export default ReceivedRollingpapersSection;
