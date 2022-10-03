import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LetterPaper from "@/pages/RollingpaperPage/components/LetterPaper";

import useValidatedParam from "@/hooks/useValidatedParam";
import { useReadRollingpaper } from "@/pages/RollingpaperPage/hooks/useReadRollingpaper";
import useMessageWrite from "./hooks/useMessageWrite";

const RollingpaperPage = () => {
  const teamId = useValidatedParam<number>("teamId");
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");
  const {
    rollingpaperState,
    handleWriteButtonClick,
    handleWriteEnd,
    handleEditButtonClick,
  } = useMessageWrite();

  const { isLoading, data: rollingpaper } = useReadRollingpaper({
    teamId,
    rollingpaperId,
    handleWriteEnd,
  });

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (!rollingpaper) {
    return <div>에러</div>;
  }

  return (
    <>
      <PageTitleWithBackButton>{rollingpaper.title}</PageTitleWithBackButton>
      <main>
        <LetterPaper
          rollingpaperState={rollingpaperState}
          to={rollingpaper.to}
          recipientType={rollingpaper.recipient}
          messageList={[...rollingpaper.messages]}
          handleWriteButtonClick={handleWriteButtonClick}
          handleEditButtonClick={handleEditButtonClick}
          handleWriteEnd={handleWriteEnd}
        />
      </main>
    </>
  );
};

export default RollingpaperPage;
