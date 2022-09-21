import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import RequireLogin from "@/components/RequireLogin";
import RequireLogout from "@/components/RequireLogout";
import PageContainer from "@/components/PageContainer";
import Snackbar from "@/components/Snackbar";

import { UserProvider } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";

import useAutoLogin from "@/hooks/useAutoLogin";
import InvitePage from "@/pages/InvitePage";

const HeaderLayoutPage = lazy(() => import("@/pages/HeaderLayoutPage"));
const RollingpaperPage = lazy(() => import("@/pages/RollingpaperPage"));
const RollingpaperCreationPage = lazy(
  () => import("@/pages/RollingpaperCreationPage")
);
const TeamDetailPage = lazy(() => import("@/pages/TeamDetailPage"));
const TeamCreationPage = lazy(() => import("@/pages/TeamCreationPage"));
const MainPage = lazy(() => import("@/pages/MainPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const TeamSearchPage = lazy(() => import("@/pages/TeamSearchPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const KakaoRedirectPage = lazy(() => import("@/pages/KakaoRedirectPage"));
const GoogleRedirectPage = lazy(() => import("@/pages/GoogleRedirectPage"));
const MyPage = lazy(() => import("@/pages/MyPage"));
const PolicyPage = lazy(() => import("@/pages/PolicyPage"));

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
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            <Route element={<RequireLogin />}>
              <Route path="/" element={<HeaderLayoutPage />}>
                <Route path="/" element={<MainPage />} />
                <Route path="team/:teamId" element={<TeamDetailPage />} />
                <Route path="search" element={<TeamSearchPage />} />
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
              <Route path="oauth/google" element={<GoogleRedirectPage />} />
            </Route>
            <Route path="invite/:inviteToken" element={<InvitePage />} />
            <Route path="policy" element={<PolicyPage />} />
          </Routes>
        </Suspense>
        {isOpened && <Snackbar />}
      </UserProvider>
    </PageContainer>
  );
};

export default App;
