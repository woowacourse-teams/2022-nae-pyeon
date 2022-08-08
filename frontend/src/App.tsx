import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import reset from "@/styles/reset";
import font from "@/styles/font";
import theme from "@/styles/theme";

import HeaderLayoutPage from "@/pages/HeaderLayoutPage";
import RollingpaperPage from "@/pages/RollingpaperPage";
import RollingpaperCreationPage from "@/pages/RollingpaperCreationPage";
import TeamDetailPage from "@/pages/TeamDetailPage";
import TeamCreationPage from "@/pages/TeamCreationPage";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import TeamSearch from "@/pages/TeamSearchPage";
import ErrorPage from "@/pages/ErrorPage";
import KakaoRedirectPage from "@/pages/KakaoRedirectPage";

import RequireLogin from "@/components/RequireLogin";
import RequireLogout from "@/components/RequireLogout";
import PageContainer from "@/components/PageContainer";
import MyPage from "@/pages/MyPage";
import { UserProvider } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";
import Snackbar from "@/components/Snackbar";

import { queryClient } from "@/api";

const App = () => {
  const { isOpened } = useSnackbar();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Global styles={font} />
        <PageContainer>
          <UserProvider>
            <Routes>
              <Route element={<RequireLogin />}>
                <Route path="/" element={<HeaderLayoutPage />}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="team/:teamId" element={<TeamDetailPage />} />
                  <Route path="search" element={<TeamSearch />} />
                  <Route path="mypage" element={<MyPage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Route>

                <Route path="team/new" element={<TeamCreationPage />} />
                <Route
                  path="team/:teamId/rollingpaper/new"
                  element={<RollingpaperCreationPage />}
                />
                <Route
                  path="team/:teamId/rollingpaper/:rollingpaperId"
                  element={<RollingpaperPage />}
                />
              </Route>
              <Route element={<RequireLogout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="oauth/kakao" element={<KakaoRedirectPage />} />
              </Route>
            </Routes>
            {isOpened && <Snackbar />}
          </UserProvider>
        </PageContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
