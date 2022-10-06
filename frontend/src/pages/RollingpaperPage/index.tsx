import { useMemo } from "react";
import styled from "@emotion/styled";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import IconButton from "@/components/IconButton";
import PencilIcon from "@/assets/icons/bx-pencil.svg";

import useValidatedParam from "@/hooks/useValidatedParam";

import MessageBox from "@/pages/RollingpaperPage/components/MessageBox";
import MessageCreateForm from "@/pages/RollingpaperPage/components/MessageCreateForm";
import useReadRollingpaper from "@/pages/RollingpaperPage/hooks/useReadRollingpaper";
import useMessageWrite from "@/pages/RollingpaperPage/hooks/useMessageWrite";
import useSliceMessageList from "@/pages/RollingpaperPage/hooks/useSliceMessageList";

import { RECIPIENT, ROLLINGPAPER_STATE_TYPE } from "@/constants";

const RollingpaperPage = () => {
  const teamId = useValidatedParam<number>("teamId");
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");
  const {
    rollingpaperState,
    handleWriteButtonClick,
    handleWriteEnd,
    handleEditButtonClick,
  } = useMessageWrite();

  const { data: rollingpaper } = useReadRollingpaper({
    teamId,
    rollingpaperId,
    handleWriteEnd,
  });

  const elementList = useMemo(() => {
    if (!rollingpaper) {
      return [];
    }

    const elementList = [...rollingpaper.messages]
      .map((message) => (
        <MessageBox
          handleEditButtonClick={handleEditButtonClick}
          handleWriteEnd={handleWriteEnd}
          key={message.id}
          recipientType={rollingpaper.recipient}
          {...message}
        />
      ))
      .reverse();

    return rollingpaperState === ROLLINGPAPER_STATE_TYPE.WRITE
      ? [
          <MessageCreateForm
            enableSecretMessage={rollingpaper.recipient === RECIPIENT.MEMBER}
            onEditEnd={handleWriteEnd}
          />,
          ...elementList,
        ]
      : [...elementList];
  }, [rollingpaperState]);

  const slicedMessageLists = useSliceMessageList(elementList);

  if (rollingpaperState === ROLLINGPAPER_STATE_TYPE.LOADING) {
    return <div>loading..</div>;
  }

  return (
    <>
      <PageTitleWithBackButton>{rollingpaper?.title}</PageTitleWithBackButton>
      <main>
        <StyledLetterPaper>
          <StyledLetterPaperTop>
            <StyledTo>To. {rollingpaper?.to}</StyledTo>
            {rollingpaperState !== ROLLINGPAPER_STATE_TYPE.WRITE && (
              <IconButton size="small" onClick={handleWriteButtonClick}>
                <PencilIcon />
              </IconButton>
            )}
          </StyledLetterPaperTop>
          <StyledSlicedMessageLists>
            {slicedMessageLists.map((messageList, index) => (
              <StyledMessageList key={index}>{messageList}</StyledMessageList>
            ))}
          </StyledSlicedMessageLists>
        </StyledLetterPaper>
      </main>
    </>
  );
};

const StyledLetterPaper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  background: ${({ theme }) => theme.colors.GRAY_100};
  border-radius: 8px;
`;

const StyledLetterPaperTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 20px;

  margin-bottom: 20px;
`;

const StyledTo = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

const StyledMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;

  a {
    display: inline-block;
  }
`;

const StyledSlicedMessageLists = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-items: center;

  height: calc(100% - 40px);

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default RollingpaperPage;
