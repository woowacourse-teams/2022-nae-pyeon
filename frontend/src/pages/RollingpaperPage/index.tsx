import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useParamValidate from "@/hooks/useParamValidate";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LetterPaper from "@/pages/RollingpaperPage/components/LetterPaper";

import { Rollingpaper, CustomError } from "@/types";
import { getRollingpaper } from "@/api/rollingpaper";

const RollingpaperPage = () => {
  const { teamId, rollingpaperId } = useParamValidate([
    "teamId",
    "rollingpaperId",
  ]);

  const {
    isLoading,
    isError,
    error: rollingpaperError,
    data: rollingpaper,
  } = useQuery<Rollingpaper>(["rollingpaper", rollingpaperId], () =>
    getRollingpaper(+teamId, +rollingpaperId)
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
        <LetterPaper
          to={rollingpaper.to}
          recipientType={rollingpaper.recipient}
          messageList={[...rollingpaper.messages].reverse()}
        />
      </main>
    </>
  );
};

export default RollingpaperPage;
