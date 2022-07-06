import React from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { Routes, Route } from "react-router-dom";

import RollingpaperPage from "@/pages/RollingpaperPage";
import RollingpaperCreationPage from "@/pages/RollingpaperCreationPage";
import MessageWritePage from "@/pages/MessageWritePage";
import MessageEditPage from "@/pages/MessageEditPage";

import reset from "./styles/reset";

const StyledPageContainer = styled.div`
  min-height: 100vh;
  margin: 0 auto;

  background-color: white;

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
        <Routes>
          <Route
            path="rollingpaper/new"
            element={<RollingpaperCreationPage />}
          />
          <Route
            path="rollingpaper/:rollingpaperId"
            element={<RollingpaperPage />}
          />
          <Route
            path="rollingpaper/:rollingpaperId/message/new"
            element={<MessageWritePage />}
          />
          <Route
            path="rollingpaper/:rollingpaperId/message/:messageId/edit"
            element={<MessageEditPage />}
          />
        </Routes>
      </StyledPageContainer>
    </div>
  );
};

export default App;
