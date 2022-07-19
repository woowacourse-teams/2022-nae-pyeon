import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import appClient from "@/api";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LetterPaper from "@/components/LetterPaper";
import RequireLogin from "@/components/RequireLogin";

import { Rollingpaper } from "@/types";

const RollingpaperPage = () => {
  const { teamId, rollingpaperId } = useParams();

  const {
    isLoading,
    isError,
    data: rollingpaper,
  } = useQuery<Rollingpaper>(["rollingpaper"], () =>
    appClient
      .get(`/teams/${teamId}/rollingpapers/${rollingpaperId}`)
      .then((response) => response.data)
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !rollingpaper) {
    return <div>에러</div>;
  }

  return (
    <RequireLogin>
      <>
        <PageTitleWithBackButton>{rollingpaper.title}</PageTitleWithBackButton>
        <main>
          <LetterPaper
            to={rollingpaper.to}
            messageList={rollingpaper.messages}
          />
        </main>
      </>
    </RequireLogin>
  );
};

export default RollingpaperPage;
