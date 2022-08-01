import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import reset from "@/styles/reset";
import font from "@/styles/font";
import theme from "@/styles/theme";

import HeaderLayoutPage from "@/pages/HeaderLayoutPage";
import RollingpaperPage from "@/pages/RollingpaperPage";
import RollingpaperCreationPage from "@/pages/RollingpaperCreationPage";
import TeamDetailPage from "@/pages/TeamDetailPage";
import SignUpPage from "@/pages/SignUpPage";
import TeamCreationPage from "@/pages/TeamCreationPage";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import TeamSearch from "@/pages/TeamSearchPage";
import ErrorPage from "@/pages/ErrorPage";

import RequireLogin from "@/components/RequireLogin";
import RequireLogout from "./components/RequireLogout";
import PageContainer from "@/components/PageContainer";
import MyPage from "@/pages/MyPage";
import { UserProvider } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";
import Snackbar from "@/components/Snackbar";

export const queryClient = new QueryClient();

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
              <Route path="/" element={<HeaderLayoutPage />}>
                <Route
                  path="/"
                  element={
                    <RequireLogin>
                      <MainPage />
                    </RequireLogin>
                  }
                />
                <Route
                  path="team/:teamId"
                  element={
                    <RequireLogin>
                      <TeamDetailPage />
                    </RequireLogin>
                  }
                />
                <Route
                  path="search"
                  element={
                    <RequireLogin>
                      <TeamSearch />
                    </RequireLogin>
                  }
                />
                <Route
                  path="mypage"
                  element={
                    <RequireLogin>
                      <MyPage />
                    </RequireLogin>
                  }
                />
                <Route path="*" element={<ErrorPage />} />
              </Route>
              <Route
                path="signup"
                element={
                  <RequireLogout>
                    <SignUpPage />
                  </RequireLogout>
                }
              />
              <Route
                path="login"
                element={
                  <RequireLogout>
                    <LoginPage />
                  </RequireLogout>
                }
              />
              <Route
                path="team/new"
                element={
                  <RequireLogin>
                    <TeamCreationPage />
                  </RequireLogin>
                }
              />
              <Route
                path="team/:teamId/rollingpaper/new"
                element={
                  <RequireLogin>
                    <RollingpaperCreationPage />
                  </RequireLogin>
                }
              />
              <Route
                path="team/:teamId/rollingpaper/:rollingpaperId"
                element={
                  <RequireLogin>
                    <RollingpaperPage />
                  </RequireLogin>
                }
              />
            </Routes>
            {isOpened && <Snackbar />}
          </UserProvider>
        </PageContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
