import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LetterPaper from "@/pages/RollingpaperPage/components/LetterPaper";

import useValidateParam from "@/hooks/useValidateParam";
import { useReadRollingpaper } from "@/pages/RollingpaperPage/hooks/useReadRollingpaper";

const RollingpaperPage = () => {
  const teamId = useValidateParam<number>("teamId");
  const rollingpaperId = useValidateParam<number>("rollingpaperId");

  const { isLoading, data: rollingpaper } = useReadRollingpaper({
    teamId,
    rollingpaperId,
  });

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (!rollingpaper) {
    return <div>에러</div>;
  }

  return (
    <>
      <PageTitleWithBackButton to={`/team/${teamId}`}>
        {rollingpaper.title}
      </PageTitleWithBackButton>
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
