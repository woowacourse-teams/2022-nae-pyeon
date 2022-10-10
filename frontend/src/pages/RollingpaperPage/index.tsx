import { ReactElement, useEffect, useState } from "react";
import styled from "@emotion/styled";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

import useValidatedParam from "@/hooks/useValidatedParam";
import { useReadRollingpaper } from "@/pages/RollingpaperPage/hooks/useReadRollingpaper";

import useSliceMessageList from "./hooks/useSliceMessageList";
import useMessageWrite from "./hooks/useMessageWrite";
import MessageBox from "./components/MessageBox";
import IconButton from "@/components/IconButton";
import PencilIcon from "@/assets/icons/bx-pencil.svg";
import { Message } from "@/types";

const RollingpaperPage = () => {
  const teamId = useValidatedParam<number>("teamId");
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [messageComponentList, setMessageComponentList] = useState<
    ReactElement[]
  >([]);

  const { isLoading, data: rollingpaper } = useReadRollingpaper({
    teamId,
    rollingpaperId,
    setMessageList,
  });

  const { handleWriteButtonClick } = useMessageWrite({
    setMessageComponentList,
    recipientType: rollingpaper?.recipient,
  });

  useEffect(() => {
    if (!rollingpaper) {
      return;
    }

    const recipientType = rollingpaper.recipient;
    const elementList = messageList
      .map((message) => (
        <MessageBox
          setMessageList={setMessageList}
          key={message.id}
          recipientType={recipientType}
          {...message}
        />
      ))
      .reverse();

    setMessageComponentList(elementList);
  }, [messageList]);

  const slicedMessageLists = useSliceMessageList(messageComponentList);

  return (
    <>
      <PageTitleWithBackButton>{rollingpaper?.title}</PageTitleWithBackButton>
      <main>
        <StyledLetterPaper>
          <StyledLetterPaperTop>
            <StyledTo>To. {rollingpaper?.to}</StyledTo>
            {
              <IconButton size="small" onClick={handleWriteButtonClick}>
                <PencilIcon />
              </IconButton>
            }
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
