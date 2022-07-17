import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import RollingpaperPage from "@/pages/RollingpaperPage";
import RollingpaperCreationPage from "@/pages/RollingpaperCreationPage";
import MessageWritePage from "@/pages/MessageWritePage";
import MessageEditPage from "@/pages/MessageEditPage";
import MessageDetailPage from "@/pages/MessageDetailPage";
import TeamDetailPage from "@/pages/TeamDetailPage";

import PageContainer from "@/components/PageContainer";

import reset from "./styles/reset";
import font from "./styles/font";
import theme from "./styles/theme";
import { SignUpPage } from "./pages/SignUpPage";
import TeamCreationPage from "./pages/TeamCreationPage";
import MainPage from "./pages/MainPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Global styles={font} />
        <PageContainer>
          <Routes>
            <Route path="/" element={<MainPage />} />
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
            <Route path="team/new" element={<TeamCreationPage />} />
            <Route path="team/:teamId" element={<TeamDetailPage />} />
          </Routes>
        </PageContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
