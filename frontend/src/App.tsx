import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AxiosError } from "axios";

import ErrorBoundary from "@/components/ErrorBoundary";
import RequireLogin from "@/components/RequireLogin";
import RequireLogout from "@/components/RequireLogout";
import PageContainer from "@/components/PageContainer";
import Snackbar from "@/components/Snackbar";

import { UserProvider } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";

import useAutoLogin from "@/hooks/useAutoLogin";

import InvitePage from "@/pages/InvitePage";
import useQueryErrorHandler from "@/api/hooks/useQueryErrorHandler";
import useMutationErrorHandler from "@/api/hooks/useMutationErrorHandler";

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

import { queryClient } from "@/api";
import { ApiErrorResponse } from "@/types/api";

const App = () => {
  const { isOpened } = useSnackbar();
  const { data, isLoading, isFetching, isError } = useAutoLogin();
  const { queryErrorHandler } = useQueryErrorHandler();
  const { mutationErrorHandler } = useMutationErrorHandler();

  if (isLoading && isFetching) {
    return <PageContainer>초기 로딩 중</PageContainer>;
  }

  queryClient.setDefaultOptions({
    queries: {
      retry: 0,
      onError: (error) =>
        queryErrorHandler(error as AxiosError<ApiErrorResponse>),
      useErrorBoundary: (error) => {
        const err = error as AxiosError<ApiErrorResponse>;
        if (!err.response) {
          return false;
        }

        return err.response?.status >= 500;
      },
    },
    mutations: {
      retry: 0,
      onError: (error) =>
        mutationErrorHandler(error as AxiosError<ApiErrorResponse>),
      useErrorBoundary: (error) => {
        const err = error as AxiosError<ApiErrorResponse>;
        if (!err.response) {
          return true; // AxiosError가 아닌 경우...?
        }

        return err.response?.status >= 500;
      },
    },
  });

  return (
    <PageContainer>
      <Suspense fallback={<div>global loading...</div>}>
        <ErrorBoundary fallback={<ErrorPage />}>
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
          </UserProvider>
        </ErrorBoundary>
      </Suspense>
      {isOpened && <Snackbar />}
    </PageContainer>
  );
};

export default App;
