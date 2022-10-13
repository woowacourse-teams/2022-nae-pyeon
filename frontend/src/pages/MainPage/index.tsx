import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import RoundButtonWithDescription from "@/components/RoundButtonWithDescription";

import MyTeamsSection from "@/pages/MainPage/components/MyTeamsSection";
import ReceivedRollingpapersSection from "@/pages/MainPage/components/ReceivedRollingpapersSection";

const MainPage = () => {
  const navigate = useNavigate();

  const handleRollingpaperStartClick = () => {
    navigate("/rollingpaper/new");
  };

  const handleTeamCreateClick = () => {
    navigate("/team/new");
  };

  const handleTeamSearchClick = () => {
    navigate("/search");
  };

  return (
    <StyledMain>
      <StyledNav>
        <RoundButtonWithDescription
          description={`롤링페이퍼\n시작하기`}
          onClick={handleRollingpaperStartClick}
        >
          📜
        </RoundButtonWithDescription>
        <RoundButtonWithDescription
          description={`모임\n만들기`}
          onClick={handleTeamCreateClick}
        >
          💙
        </RoundButtonWithDescription>
        <RoundButtonWithDescription
          description={`모임\n검색하기`}
          onClick={handleTeamSearchClick}
        >
          🔍
        </RoundButtonWithDescription>
      </StyledNav>
      <MyTeamsSection />
      <ReceivedRollingpapersSection />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 32px;

  margin: 10px;

  @media only screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

export default MainPage;
