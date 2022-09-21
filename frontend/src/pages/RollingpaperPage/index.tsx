import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LetterPaper from "@/pages/RollingpaperPage/components/LetterPaper";

import { CustomError } from "@/types";
import { getRollingpaper } from "@/api/rollingpaper";

import useValidatedParam from "@/hooks/useValidatedParam";

const RollingpaperPage = () => {
  const teamId = useValidatedParam<number>("teamId");
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  const {
    isLoading,
    isError,
    error: rollingpaperError,
    data: rollingpaper,
  } = useQuery(["rollingpaper", rollingpaperId], () =>
    getRollingpaper({ teamId, id: rollingpaperId })
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
          messageList={[...rollingpaper.messages]}
        />
      </main>
    </>
  );
};

export default RollingpaperPage;
