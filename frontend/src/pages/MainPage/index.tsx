import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import MyTeamsSection from "@/pages/MainPage/components/MyTeamsSection";
import ReceivedRollingpapersSection from "@/pages/MainPage/components/ReceivedRollingpapersSection";
import NavigationButton from "./components/NavigationButton";

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
        <NavigationButton
          icon="📜"
          description={`롤링페이퍼\n만들기`}
          onClick={handleRollingpaperStartClick}
        />
        <NavigationButton
          icon="💙"
          description={`모임\n만들기`}
          onClick={handleTeamCreateClick}
        />
        <NavigationButton
          icon="🔍"
          description={`모임\n검색하기`}
          onClick={handleTeamSearchClick}
        />
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
  justify-content: space-around;

  margin: 10px;
`;

export default MainPage;
