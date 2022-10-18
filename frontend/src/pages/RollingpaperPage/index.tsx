import styled from "@emotion/styled";
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
      <StyledPageTitle>{rollingpaper.title}</StyledPageTitle>
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

const StyledPageTitle = styled.h1`
  margin-bottom: 18px;
  font-size: 32px;
  text-align: center;
`;

export default RollingpaperPage;
