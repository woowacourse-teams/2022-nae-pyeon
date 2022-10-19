import useValidateParam from "@/hooks/useValidateParam";
import { useReadRollingpaper } from "@/pages/RollingpaperPage/hooks/useReadRollingpaper";

import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";
import LetterPaper from "@/pages/RollingpaperPage/components/LetterPaper";

const RollingpaperPage = () => {
  const teamId = useValidateParam<number>("teamId");
  const rollingpaperId = useValidateParam<number>("rollingpaperId");

  const { isLoading, data: rollingpaper } = useReadRollingpaper({
    teamId,
    rollingpaperId,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!rollingpaper) {
    return <div>에러</div>;
  }

  return (
    <>
      <PageTitle title={rollingpaper.title} titleAlign="center" />
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
