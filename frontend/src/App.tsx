import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ErrorBoundary from "@/components/ErrorBoundary";
import RequireLogin from "@/components/RequireLogin";
import RequireLogout from "@/components/RequireLogout";
import PageContainer from "@/components/PageContainer";
import Snackbar from "@/components/Snackbar";
import Loading from "@/components/Loading";

import { UserProvider } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";

import useAutoLogin from "@/hooks/useAutoLogin";
import useApiErrorHandler from "@/hooks/useApiErrorHandler";

import InvitePage from "@/pages/InvitePage";
import LogoutPage from "@/pages/LogoutPage";

const HeaderLayoutPage = lazy(() => import("@/pages/HeaderLayoutPage"));
const RollingpaperPage = lazy(() => import("@/pages/RollingpaperPage"));
const RollingpaperCreationPage = lazy(
  () => import("@/pages/RollingpaperCreationPage")
);
const TeamDetailPage = lazy(() => import("@/pages/TeamDetailPage"));
const TeamCreationPage = lazy(() => import("@/pages/TeamCreationPage"));
const MainPage = lazy(() => import("@/pages/MainPage"));
const MyTeamsPage = lazy(() => import("@/pages/MyTeamPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const TeamSearchPage = lazy(() => import("@/pages/TeamSearchPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const KakaoRedirectPage = lazy(() => import("@/pages/KakaoRedirectPage"));
const GoogleRedirectPage = lazy(() => import("@/pages/GoogleRedirectPage"));
const MyPage = lazy(() => import("@/pages/MyPage"));
const PolicyPage = lazy(() => import("@/pages/PolicyPage"));

import { setQueryClientErrorHandler } from "@/api";

const App = () => {
  const { isOpened } = useSnackbar();
  const { data, isLoading, isFetching } = useAutoLogin();
  const apiErrorHandler = useApiErrorHandler();

  useEffect(() => {
    setQueryClientErrorHandler(apiErrorHandler);
  }, []);

  if (isLoading && isFetching) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  return (
    <Suspense
      fallback={
        <PageContainer>
          <Loading />
        </PageContainer>
      }
    >
      <ErrorBoundary fallback={<ErrorPage />}>
        <UserProvider
          initialData={
            data && {
              isLoggedIn: true,
              memberId: data.id,
            }
          }
        >
          <PageContainer>
            <Routes>
              <Route element={<RequireLogin />}>
                <Route path="/" element={<HeaderLayoutPage />}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="my-teams" element={<MyTeamsPage />} />
                  <Route path="team/:teamId" element={<TeamDetailPage />} />
                  <Route path="search" element={<TeamSearchPage />} />
                  <Route path="mypage" element={<MyPage />} />
                  <Route
                    path="rollingpaper/new"
                    element={<RollingpaperCreationPage />}
                  />
                </Route>
                <Route path="team/new" element={<TeamCreationPage />} />

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
              <Route path="invite/:inviteCode" element={<InvitePage />} />
              <Route path="policy" element={<PolicyPage />} />
              <Route path="logout" element={<LogoutPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </PageContainer>
          {isOpened && <Snackbar />}
        </UserProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
