import React from "react";
import { Routes, Route } from "react-router-dom";

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
import MyPage from "@/pages/MyPage";

import RequireLogin from "@/components/RequireLogin";
import RequireLogout from "@/components/RequireLogout";
import PageContainer from "@/components/PageContainer";
import Snackbar from "@/components/Snackbar";

import { UserProvider } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";

import useAutoLogin from "@/hooks/useAutoLogin";
import InvitePage from "@/pages/InvitePage";

const App = () => {
  const { isOpened } = useSnackbar();
  const { data, isLoading, isFetching, isError } = useAutoLogin();

  if (isLoading && isFetching) {
    return <PageContainer>초기 로딩 중</PageContainer>;
  }

  return (
    <PageContainer>
      <UserProvider
        initialData={
          data && {
            isLoggedIn: true,
            memberId: data.id,
          }
        }
      >
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
          <Route path="invite/:inviteToken" element={<InvitePage />} />

        </Routes>
        {isOpened && <Snackbar />}
      </UserProvider>
    </PageContainer>
  );
};

export default App;
