import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { appClient } from "@/api";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LetterPaper from "@/pages/RollingpaperPage/components/LetterPaper";

import { Rollingpaper, CustomError } from "@/types";

const RollingpaperPage = () => {
  const { teamId, rollingpaperId } = useParams();

  const {
    isLoading,
    isError,
    error: rollingpaperError,
    data: rollingpaper,
  } = useQuery<Rollingpaper>(["rollingpaper", teamId, rollingpaperId], () =>
    appClient
      .get(`/teams/${teamId}/rollingpapers/${rollingpaperId}`)
      .then((response) => response.data)
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    if (axios.isAxiosError(rollingpaperError) && rollingpaperError.response) {
      const customError = rollingpaperError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!rollingpaper) {
    return <div>에러</div>;
  }

  return (
    <>
      <PageTitleWithBackButton>{rollingpaper.title}</PageTitleWithBackButton>
      <main>
        <LetterPaper to={rollingpaper.to} messageList={rollingpaper.messages} />
      </main>
    </>
  );
};

export default RollingpaperPage;
