import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import RoundButton from "@/components/RoundButtonWithDescription";
import RollingpaperListItem from "@/components/RollinpaperListItem";

import useReadMyTeams from "@/pages/MainPage/hooks/useReadMyTeams";

import MyTeamCard from "@/pages/MainPage/components/MyTeamCard";
import EmptyMyTeamList from "@/pages/MainPage/components/EmptyMyTeamList";
import SectionHeader from "@/pages/MainPage/components/SectionHeader";
import useReadReceivedRollingpapers from "../MyPage/hooks/useReadReceivedRollingpapers";

const MainPage = () => {
  const { data: myTeamListResponse, isLoading: isLoadingTeams } =
    useReadMyTeams();
  const { data: receivedRollingpapers, isLoading: isLoadingRollingpapers } =
    useReadReceivedRollingpapers();
  const navigate = useNavigate();

  if (isLoadingTeams || isLoadingRollingpapers) {
    return <div>로딩 중</div>;
  }

  if (myTeamListResponse?.teams.length === 0) {
    return (
      <StyledEmptyMain>
        <EmptyMyTeamList />
      </StyledEmptyMain>
    );
  }

  const handleRollingpaperStartClick = () => {
    navigate("/");
  };

  const handleTeamCreateClick = () => {
    navigate("/team/new");
  };

  const handleTeamSearchClick = () => {
    navigate("/search");
  };

  return (
    <StyledMain>
      <StyledTopButtonList>
        <RoundButton
          description="롤링페이퍼 시작하기"
          onClick={handleRollingpaperStartClick}
        >
          📜
        </RoundButton>
        <RoundButton description="모임 생성" onClick={handleTeamCreateClick}>
          💙
        </RoundButton>
        <RoundButton description="모임 검색" onClick={handleTeamSearchClick}>
          🔍
        </RoundButton>
      </StyledTopButtonList>
      <section>
        <SectionHeader
          title="내편들"
          count={myTeamListResponse?.totalCount}
          moreLink="/"
        />
        <StyledCardList>
          {myTeamListResponse?.teams.map(
            ({ id, name, description, emoji, color }) => (
              <MyTeamCard
                key={id}
                id={id}
                name={name}
                description={description}
                emoji={emoji}
                color={color}
              />
            )
          )}
        </StyledCardList>
      </section>
      <section>
        <SectionHeader
          title="나의 롤링페이퍼"
          count={receivedRollingpapers?.totalCount}
          moreLink="/mypage"
        />
        <StyledRollingpaperList>
          {receivedRollingpapers?.rollingpapers.map(
            ({ title, teamId, id, teamName }) => (
              <RollingpaperListItem
                key={id}
                title={title}
                teamId={teamId}
                id={id}
                teamName={teamName}
              />
            )
          )}
        </StyledRollingpaperList>
      </section>
    </StyledMain>
  );
};

const StyledEmptyMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  height: calc(100vh - 150px);

  button {
    width: 152px;
  }
  svg {
    font-size: 200px;
  }
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;
`;

const StyledTopButtonList = styled.div`
  display: flex;
  gap: 20px;

  margin: 10px;

  @media only screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

const StyledCardList = styled.div`
  display: flex;
  overflow: scroll;
  gap: 20px;
  align-items: center;

  height: 100%;
  padding: 10px;
  a {
    height: fit-content;
  }
`;

const StyledRollingpaperList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 10px;
  margin-bottom: 20px;

  height: 460px;
`;

export default MainPage;
