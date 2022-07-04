import React from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import reset from "./styles/reset";
import RollingpaperPage from "@/pages/RollingpaperPage";

const StyledPageContainer = styled.div`
  height: 100vh;
  margin: 0 auto;

  @media only screen and (min-width: 600px) {
    width: 500px;
  }

  @media only screen and (min-width: 960px) {
    width: 760px;
  }

  @media only screen and (min-width: 1280px) {
    width: 1020px;
  }
`;

const App = () => {
  return (
    <div>
      <Global styles={reset} />
      <StyledPageContainer>
        <RollingpaperPage />
      </StyledPageContainer>
    </div>
  );
};

export default App;
