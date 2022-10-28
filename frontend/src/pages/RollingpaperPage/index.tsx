import useValidateParam from "@/hooks/useValidateParam";
import { useReadRollingpaper } from "@/hooks/api/rollingpaper";

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

  if (isLoading || !rollingpaper) {
    return <Loading />;
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
