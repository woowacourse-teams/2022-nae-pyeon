import React from "react";
import styled from "@emotion/styled";
import { Global, ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import RollingpaperPage from "@/pages/RollingpaperPage";
import RollingpaperCreationPage from "@/pages/RollingpaperCreationPage";
import MessageWritePage from "@/pages/MessageWritePage";
import MessageEditPage from "@/pages/MessageEditPage";
import MessageDetailPage from "@/pages/MessageDetailPage";

import reset from "./styles/reset";
import font from "./styles/font";
import theme from "./styles/theme";
import { SignUpPage } from "./pages/SignUpPage";

const StyledPageContainer = styled.div`
  min-height: 100vh;
  margin: 0 auto;

  background-color: ${({ theme }) => theme.colors.WHITE};

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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Global styles={font} />
        <StyledPageContainer>
          <Routes>
            <Route path="signup" element={<SignUpPage />} />
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
              path="rollingpaper/:rollingpaperId/message/:messageId"
              element={<MessageDetailPage />}
            />
            <Route
              path="rollingpaper/:rollingpaperId/message/:messageId/edit"
              element={<MessageEditPage />}
            />
          </Routes>
        </StyledPageContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
