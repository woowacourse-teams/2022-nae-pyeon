import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import RoundButtonWithDescription from "@/components/RoundButtonWithDescription";

import MyTeamsSection from "./components/MyTeamsSection";
import ReceivedRollingpapersSection from "./components/ReceivedRollingpapersSection";

const MainPage = () => {
  const navigate = useNavigate();

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
      <StyledNav>
        <RoundButtonWithDescription
          key="롤링페이퍼시작하기"
          description={`롤링페이퍼\n시작하기`}
          onClick={handleRollingpaperStartClick}
        >
          📜
        </RoundButtonWithDescription>
        <RoundButtonWithDescription
          key="모임만들기"
          description={`모임\n만들기`}
          onClick={handleTeamCreateClick}
        >
          💙
        </RoundButtonWithDescription>
        <RoundButtonWithDescription
          key="`모임검색하기`"
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
